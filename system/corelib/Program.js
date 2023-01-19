class Program {
  
}

class Shortcut extends Program {
  
}

class ShortcutsDataFile extends CloudFile {
  constructor (
    subpath = String()
  ) {
    super(
      subpath,
      "iCloud/Shortcuts/Data"
    );
  }
}

class ConfigFile extends File {
  get app() {
    return this.config?.app ?? new Object();
  }
  
  get config() {
    try {
      const data = super.data;
      if (data?.constructor !== String)
        throw new ReferenceError(
          "super.data returned non-string value when expecting string"
        );
      else if (data === String())
        throw new SyntaxError(
          "super.data returned empty string when string containing parsable JSON was expected"
        );
      else {
        const config = new Config(
          data,
          this.path
        ) ?? null;
        if (config === null)
          throw new ReferenceError(
            "Config() returned undefined or null when expecting an instance of Config"
          );
        else if (!(
          config instanceof Config
        ))
          throw new ReferenceError(
            "Config() returned a non-nullish, but non-Config value when expecting an instance of Config"
          );
        else return config;
      }
    } catch (e) {
      console.warn(
        "File::ConfigFile:config: failed to parse super.data into a Config object. See caught error: "
        + e
      );
      return null;
    }
  }
  
  get data() {
    return this.config?.data ?? new Object();
  }
  
  get setting() {
    return this.config?.setting ?? new Object();
  }
  
  get settingAppEnforced() {
    return this.config?.settingAppEnforced ?? new Object();
  }
  
  get settingUserOverrideAllowed() {
    return this.config?.settingUserOverrideAllowed ?? new Object();
  }
  
  get user() {
    return this.config?.user ?? new Object();
  }
  
  write() {
    throw new ReferenceError("File::ShortcutsConfigFile:write: Cannot overwrite a protected config file.");
  }
}

class Config {
  #data = new Object();
  #source = undefined;
  #parsed = false;
  constructor(
    data = String(),
    source = undefined
  ) {
    this.#parsed = false;
    this.#source = source;
    try {
      if (data?.constructor !== String)
        throw new TypeError(
          "non-string data passed to setter when expecting string"
        );
      if (data === String())
        throw new SyntaxError(
          "empty string data when expected non-empty string"
        );
      else {
        this.#data = JSON.parse(data);
        if (this.#data instanceof Object)
          this.#parsed = true;
        else 
          throw new SyntaxError(
            "Json parser did not throw error when parsing the data, but returned parsed results that were not an Object"
          );
      }
    } catch (e) {
      console.warn("Config:set data: data string could not be parsed into an Object. See caught error: " + e);
      this.#parsed = false;
      this.#data = new Object();
    }
  }
  
  get app() {
    return this.data?.app ?? new Object();
  }
  
  get data() {
    return this.#data ?? new Object();
  }
  
  get parsed() {
    return this.#parsed === true;
  }
  
  get setting() {
    return this.settingUserOverrideAllowed ?? new Object();
  }
  
  get settingAppEnforced() {
    return this.constructor.mergeObjects(
      this.app ?? new Object(),
      this.user ?? new Object()
    ) ?? new Object();
  }
  
  get settingUserOverrideAllowed() {
    return this.constructor.mergeObjects(
      this.user ?? new Object(),
      this.app ?? new Object()
      ) ?? new Object();
  }
  
  get source() {
    return this.#source;
  }
  
  get user() {
    return this.data?.user ?? new Object();
  }
  
  static mergeObjects(
    winners = new Object(),
    losers = new Object()
  ) {
    const mergePrimitives = function(
      winner = String(),
      loser = String()
    ) {
      return (winner ?? loser) ?? String();
    };
    
    const mergeArrays = function(
      winner = new Array(),
      loser =  new Array()
    ) {
      return (
        (Array.isArray(winner)?
          winner
          :new Array()
        )?.concat(
          (Array.isArray(loser)?
            loser
            :new Array()
          )
        )
      ) ?? new Array();
    };
    
    const primitive = function(
      obj = new Object()
    ) {
      return (
        obj?.constructor === String
        || obj?.constructor === Number
        || obj?.constructor === Boolean
      );
    };
    
    const intersectKeys = function(
      a = new Object(),
      b = new Object()
    ) {
      return Object.keys(a)?.filter(
        (aKey) => (
          Object.keys(b)?.includes(aKey)
        )
      ) ?? new Array();
    };
    
    const uniqueKeysOf = function(
      obj = new Object(),
      intersection = new Array()
    ) {
      return Object.keys(obj)?.filter(
        (objKey) => (
          !intersection?.includes(objKey)
        )
      ) ?? new Array();
    };
    
    const intersection = intersectKeys(
      winners ?? new Object(),
      losers ?? new Object()
    ) ?? new Array(); 
    
    const uniqueWinners = uniqueKeysOf(
      winners ?? new Object(),
      intersection ?? new Array()
    ) ?? new Array();
    const uniqueLosers = uniqueKeysOf(
      losers ?? new Object(),
      intersection ?? new Array()
      ) ?? new Array();
      
    const merger = new Map();
    for (const l of uniqueLosers)
      merger.set(l, losers[l]);
    for (const w of uniqueWinners)
      merger.set(w, winners[w]);
    for (const i of intersection) {
      if (winners[i] === undefined
        || winners[i] === null
      ) merger.set(i, losers[i]);
      else if (losers[i] === undefined
        || losers[i] === null
      ) merger.set(i, winners[i]);
      else if (primitive(winners[i])
        && primitive(losers[i])
      ) merger.set(i, mergePrimitives(
          winners[i],
          losers[i]
        )
      );
      else if (Array.isArray(winners[i])
        && Array.isArray(losers[i])
      ) merger.set(i, mergeArrays(
          winners[i],
          losers[i]
        )
      );
      else if (Array.isArray(winners[i]))
        merger.set(i, mergeArrays(
          winners[i],
          [losers[i]]
        )
      );
      else if (Array.isArray(losers[i]))
        merger.set(i, mergeArrays(
          [winners[i]],
          losers[i]
        )
      );
      else
        merger.set(i, this.mergeObjects(
          winners[i],
          losers[i]
        )
      );
    }
    return (
      Object.fromEntries(merger)
      ?? new Object()
    );
  }
  
  toString() {
    return JSON.stringify(
      this.data ?? new Object()
    ) ?? String();
  }
}

class ScriptableConfigFile extends ConfigFile {
  constructor (
    subpath = String()
  ) {
    super(
      subpath ?? String(),
      "Repositories/Scriptable/config"
    );
  }
}

class ShortcutsConfigFile extends ConfigFile {
  constructor (
    subpath = String()
  ) {
    super(
      subpath,
      "Repositories/Shortcuts/config"
    );
  }
}

module.exports = Config;
module.exports.Config = Config;


module.exports = Program;
module.exports.Program = Program;
module.exports.Shortcut = Shortcut;

const System = importModule("./system/System");
const ReadOnlyFile = System.ReadOnlyFile;

class Config {
  #file = new ReadOnlyFile();
  constructor (
    configRoot = String(),
    programName = String()
  ) {
    const configDir = System.configDir;
    this.#file = ReadOnlyFile.fromFile(
      configDir,
      ReadOnlyFile.joinPaths(
        (
          configRoot
          ?.constructor === String
        )?
        configRoot
        :String(),
        (
          programName
          ?.constructor === String
        )?
        [
          programName ?? String(),
          String("json")
        ].join(".")
        :String()
      ) ?? String()
    ) ?? new ReadOnlyFile();
  }
  
  get isParseable() {
    try {
      JSON.parse(this.#file?.data);
      return true;
    } catch (e) {
      return false;
    }
  }
  
  get unmerged() {
    return this.isParseable?
      JSON.parse(this.#file?.data)
        ?? new Object()
      :new Object();
  }
  
  get app() {
    return this.unmerged?.app 
      ?? new Object();
  }
  
  get user() {
    return this.unmerged?.user 
    ?? new Object();
  }
  
  get merged() {
    return this.constructor.mergeObjects(
      this.user ?? new Object(),
      this.app ?? new Object()
      ) ?? new Object();
  }
  
  get mergedUserOverridesProhibited() {
    return this.constructor.mergeObjects(
      this.app ?? new Object(),
      this.user ?? new Object()
      ) ?? new Object();
  }
  
  toString() {
    return this.#file?.data ?? String();
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
}

module.exports = Config;
module.exports.Config = Config;

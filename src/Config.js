// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: magic;

class Config {
  #data = new Object();
  #source = undefined;
  #parsed = false;
  constructor(
    data = String(),
    source = undefined
  ) {
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
            "Json parser did not throw error when parsing the data, but returned parses results that were not an Object"
          );
      }
    } catch (e) {
      console.warn("Config:set data: data string could not be parsed into an Object. See caught error: " + e);
      this.#parsed = false;
      this.#data = new Object();
    }
    this.#source = source;
  }
  
  get app() {
    return this.data?.app ?? new Object();
  }
  
  get data() {
    return this.#data ?? new Object();
  }
  
  get setting() {
    return this.settingUserOverrideAllowed;
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
    const mergePrimitive = function(
      winner,
      loser
    ) {

    };
    
    const mergeArrays = function(
      winner = new Array(),
      loser = new Array()
    ) {
      
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
      obj = new Object,
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
    
    const merger = uniqueLosers.
    
    return new Object();
  }
}

module.exports = Config;
module.exports.Config = Config;

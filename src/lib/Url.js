// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
class Host {
  
}

class IPHost extends Host {
  
}

class IPv4Host extends IPHost {
  #ip = new Array()
  constructor (
    part1,
    part2,
    part3,
    part4
  ) {
    
  }
  
  get ip() {
    
  }
  
  get isIp() {
    return this.ip
      this.constructor.isIpPart()
    );
  }
  
  static fromString(host = String()) {
    
  }
  
  static isIpPart(part = String()) {
    return part?.constructor === String
    && part.trim() !== String()
    && !isNaN(+(part?.trim()));
  }
  
  static parse(host = String()) {
    host = host?.constructor === String?
      host.trim() : String();
      
    const parts = host
      .split(".")
      .filter((part) => (
        part?.constructor === String
        && part.trim() !== String()
      )).map((part) => (
        part.trim()
      ));
      
    if (parts.length === 4) {
      
    } else {
      return false;
    }
      && (parts[3].split(":")
        && 
        )
      && parts.slice(0, 3)
  }
}

class IPv6Host extends IPHost {
  
}

class RegNameHost extends Host {
  
}

class Url {
  #callbackUrl = new CallbackURL();
  
  constructor(
    protocol,
    host = new Host(),
    port,
    path,
    query,
    fragment
  ) {
    
  }
  
  static fromString(
    url = String()
  ) {
    url = url.trim();
    return new this();
  }
  
  static fromCallbackUrl(
    callbackUrl = new CallbackURL(String())
  ) {
    // dont decode or re-encode
    return this.fromString(callbackUrl.getURL());
  }
  
  static fromUrl(url = new Url(String())) {
    return this.fromString(scriptableUrl.url);
  }
  
  get base() {
    return (new this.constructor.#UrlBag(this.urlWithoutQuery)).base;
  }
  
  get query() {
    return this.queryMap.entries().map((q) => (q.join("="))).join("&");
  }
  
  set query(query = String()) {
    this.queryMap = (new this.constructor.#UrlBag(query)).queryMap;
  }
  
  get queryMap() {
    return this.constructor.#deleteCallbackParameters((new this.constructor.#UrlBag(this.urlWithCallback)).queryMap);
  }
  
  set queryMap(map = new Map()) {
    this.constructor.#deleteCallbackParameters(map).entries().map(([name, value]) => (this.addParameter(name, value)));
  }
  
  get scheme() {
    return (new this.constructor.#UrlBag(this.urlWithoutQuery)).scheme;
  }
  
  get url() {
    return [this.urlWithoutQuery, this.query].join("?");
  }
  
  set url(url = String()) {
    
    try {
      if (url === null) {
        throw new TypeError("input is null when expecting a non-empty string");
      } else if (url === undefined) {
        throw new TypeError("input is undefined when expecting a non-empty string");
      } else if (String(url) === String()) {
        throw new TypeError("input is an empty string when expecting a non-empty string")
      } else {
            const urlBag = new this.constructor.#UrlBag(url);
                
    this.#callbackUrl = new CallbackURL(urlBag.urlWithoutQuery);
    
    this.query = urlBag.query;
      }
    } catch (e) {
      console.error("ScriptableUrl: set url(): " + e);
    }
  }
  
  get urlWithoutQuery() {
    return (new this.constructor.#UrlBag(this.urlWithCallback)).urlWithoutQuery;
  }
  
  get urlWithCallback() {
    return this.#callbackUrl.getURL();
  }
  
  addParameter(name = String(), value = String()) {
    this.#callbackUrl().addParameter(name, value);
  }
  
  open() {
    Safari.open(this.url);
  }
  
  openCallback() {
    this.#callbackUrl.open();
  }
  
  openWebview() {
    Safari.openInApp(this.url, false);
  }
  
  toString() {
    return this.url;
  }
  
  static #deleteCallbackParameters(map = new Map()) {
    const queryMapKeyToLowerMap = new Map(map.keys().map((key) => ([key, key.toLowerCase()])));
    
    const xCallbackParamNames = [
      "x-source",
      "x-success",
      "x-error",
      "x-cancel"
    ];
    
    xCallbackParamNames.map((name) => (queryMapKeyToLowerMap.entries().filter(([key, lower]) => (lower === name.toLowerCase())).map(([key, lower]) => (map.delete(key)))));
    
    return map;
  }
  
  static #UrlBag = class {
    #base = String();
    #query = String();
    #scheme = String();
    #url = String();
    #urlWithoutQuery = String();
    
    constructor(url = String()) {   
      this.#url = url.trim();
      
      const urlQuerySplitter = new this.constructor.#Splitter(this.url, "?", "=");
      this.#urlWithoutQuery = urlQuerySplitter.left;
      this.#query = urlQuerySplitter.right;
      
      const schemeBaseSplitter = new this.constructor.#Splitter(this.urlWithoutQuery, "://");
      this.#scheme = schemeBaseSplitter.left;
      this.#base = schemeBaseSplitter.right;
    }
    
    get base() {
      return this.#base;
    }
    
    get query() {
      return this.#query;
    }
    
    get queryMap() {
      return new Map(this.query.split("&").map((q) => (q.split("="))));
    }
    
    get scheme() {
      return this.#scheme;
    }
    
    get url() {
      return this.#url;
    }
    
    get urlWithoutQuery() {
      return this.#urlWithoutQuery;
    }
    
    static #Splitter = class {
      #left = String();
      #right = String();
      
      constructor (url = String(), separator = String(), rightOnly = String()) {
        const tokens = url.split(separator);
        
        this.#left = tokens.shift();
        if (rightOnly !== String() && this.#left.includes(rightOnly)) {
          tokens.unshift(this.#left);
          this.#left = String();
        }
        
        this.#right = tokens.join(separator);
      }
      
      get left() {
        return this.#left;
      }
      
      get right() {
        return this.#right;
      }
    }
  };
}

module.exports = Url;
module.exports.Url = Url;
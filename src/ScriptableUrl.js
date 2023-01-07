// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
class ScriptableUrl {
  #callbackUrl = new CallbackURL();
  
  constructor(url = String()) {
    this.url = url;
  }
  
  static fromString(url = String()) {
    return new this(url);
  }
  
  static fromCallbackUrl(callbackUrl = new CallbackURL(String())) {
    return this.fromString(callbackUrl.getURL());
  }
  
  static fromScriptableUrl(scriptableUrl = new ScriptableUrl(String())) {
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
    const urlBag = new this.constructor.#UrlBag(url);
    
    this.#callbackUrl = new CallbackURL(urlBag.urlWithoutQuery);
    
    this.query = urlBag.query;
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

module.exports = ScriptableUrl;
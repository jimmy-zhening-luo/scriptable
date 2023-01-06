// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;


class ScriptableUrl {
  
  
  #callbackUrl = new CallbackURL;
  #urlBag = new this.constructor.#UrlBag;
  
  constructor(url) {
    const callbackUrlWithoutQuery = new CallbackURL(url);
    
    const inputUrlBag = new this.constructor.#UrlBag(url);
    
    const queryMap 
    
  }
  
  static fromString(url = String) {
    return new this(url);
  }
  
  static fromCallbackUrl(callbackUrl = new CallbackURL(String)) {
    
    return this.fromString(callbackUrl.getURL())
  }
  
  static fromScriptableUrl(scriptableUrl = new ScriptableUrl(String)) {
    return this.fromString()
  }
  
  get base() {
    
  }
  
  set base() {
    
  }
  
  get query() {
    
  }
  
  set query() {
    
  }
  
  get queryMap() {
    
  }
  
  set queryMap() {
    
  }
  
  get scheme() {
    const url = this.urlWithoutQuery;
    const s = "://";
    const urlSplitBySchemeDelimiter = url.split(s);
    const scheme = urlSplitBySchemeDelimiter.shift();
    return scheme;
  }
  
  set scheme() {
    
  }
  
  get url() {
    return this.#urlBag.url;
  }
  
  get urlWithoutQuery() {
    return this.#urlBag.urlWithoutQuery;  
  }
  
  addParameter(name = String, value = String) {
    
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
  
  static queryToMap(query = String) {
    
  }
  
  static mapToQuery(map = new Map())
  
  static #removeXCallbackParamsFromQuery(query = String) {
    
  }
  
  static #UrlBag = class {
    
    #url = String;
    #urlWithoutQuery = String;
    #query = String;
    
    constructor(url = String) {
      const urlBag = this.constructor.splitUrlFromQuery(url);
      this.#url = url;
      this.#urlWithoutQuery = urlBag.left;
      this.#query = urlBag.right;
    }
    
    get url() {
      return this.#url;
    }
    
    get urlWithoutQuery() {
      return this.#urlWithoutQuery;
    }
    
    get query() {
      return this.#query;
    }
    
    static splitUrlFromQuery(url = String) {
      const q = "?";
      
      const urlSplitByQueryDelimiter = url.split(q);
      
      const urlWithoutQuery = urlSplitByQueryDelimiter.shift();
      
      const query = urlSplitByQueryDelimiter.join(q);
      
      return {
        left: urlWithoutQuery,
        right: query
      }
    }
  };
  
}
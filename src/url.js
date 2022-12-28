// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: magic;
class Url {
  constructor(scheme, base = String, path = String, fragment = String, queryMap = new Map) {
    this.scheme = scheme;
    this.base = base;
    this.path = path;
    this.fragment = fragment;
    this.query = {
      "map": queryMap,
      "string": String
    };
    
    try {
      const queryStringFragments = Object.entries(queryMap).map(([key, value]) => String(key).concat("=", String(value)));
      
      this.query.string = queryStringFragments.reduce((str, substr) => String(str).concat("&", String(substr)));
      
    } catch (e) {
      console.error(e);
    }
    
  }
  
  static encode(url = String) 
}

module.exports = Url;
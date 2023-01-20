const Scheme = importModule("Scheme");
const Host = importModule("host/Host");
const Path = importModule("Path");
const Query = importModule("Query");
const Fragment = importModule("Fragment");

class Url {
  #scheme = new Scheme();
  #host = new Host();
  #path = new Path();
  #query = new Query();
  #fragment = new Fragment();
  constructor (
    scheme = new Scheme(),
    host = new Host(),
    path = new Path(),
    query = new Query(),
    fragment = new Fragment()
  ) {
    
  }
  
  static fromParts (
    scheme = new Scheme(),
    host = new Host(),
    path = new Path(),
    query = new Query(),
    fragment = new Fragment()
  ) {
    
  }
  
  static fromStringParts (
    scheme = String(),
    host = String(),
    path = String(),
    query = String(),
    fragment = String()
  ) {
    
  }
  
  static fromUrl (
    url = new this()
  ) {
    url = (typeof url 
    
    const scheme = url
      ?.scheme
      ?? new Scheme();
    const host = url
      ?.host
      ?? new Host();
    const path = url
      ?.path
      ?? new Path();
    const query = url
      ?.query
      ?? new Query();
    const fragment = url
      ?.fragment
      ?? new Fragment();
    
    return new this(
      
    );
  }
  
  static fromString (
    url = String()
  ) {
    /*
    first, parse the query.
      split by ?
        if one part:
          possible:
            url without q
            q without prepended ?
          split by 
    */
  }
  
  get scheme() {
    
  }
  
  set scheme(scheme = String()) {
    
  }
}

module.exports = Url;
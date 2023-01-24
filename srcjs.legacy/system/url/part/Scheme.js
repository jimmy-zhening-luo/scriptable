"use strict";
class Scheme {
  #scheme = String()
  constructor (
    scheme = String()
      ?? new this()
  ) {
    scheme = scheme
      ?? String();
    scheme = (
      scheme
      ?.constructor === String
    )?
      scheme
      :String();
      
  }
  
  get scheme() {
    return (this
    .#scheme
    ?.constructor === String 
    )?
      this.#scheme
      :String();
  }
  
  get string() {
    return this.scheme ?? String();
  }
  
  toString() {
    return this.string ?? String();
  }
}

module.exports = Scheme;

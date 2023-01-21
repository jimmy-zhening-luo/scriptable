"use strict";

class UrlPart {
  #part = String();
  constructor (
    part
  ) {
    this.part = part;
  }
  
  get part() {
    return this.#part
      ?? String();
  }
  
  set part() {
    
  }
  
  get string() {
    return this.part
      ?? String();
  }
  
  toString() {
    return this.string
      ?? String();
  }
  
  static parse() {
    
  }
}

module.exports = UrlPart;
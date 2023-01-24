"use strict";
class Fragment {
  #fragment = String()
  constructor (
    fragment = String()
      ?? new this()
  ) {
    this.fragment = fragment;
  }
  
  get fragment() {
    return this.#fragment
      ?? String();
  }
  
  set fragment(
    fragment = String()
      ?? new this.constructor()
  ) {
    this.#fragment = this
      .constructor
      .parseFragment(
        fragment
      )
      ?? String();
  }
  
  get string() {
    return this.fragment
      ?? String();
  }
  
  toString() {
    return this.string
      ?? String();
  }
  
  static allowed(
    char = String()
  ) {
    // WIP
    char = (char?.constructor === String)?
      char.trim().slice(0, 1)
      :String();
    
      // pchar, /, ?
    return false;
  }
  
  static parseFragment(
    fragment = String()
      ?? new this()
  ) {
    if (fragment?.constructor === String)
      fragment = fragment.trim();
    else if (
      fragment
      ?.fragment
      ?.constructor === String
    )
      fragment = fragment
        .fragment
        ?? String();
    while (fragment.startsWith("#"))
      fragment = fragment
        .slice(1)
        .trim();
    return [...fragment].every(
      (char) => (
        this.allowed(char)
      )
    )?
      fragment
      :String();
  }
}

module.exports = Fragment;

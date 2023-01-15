// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
class Directory {
  #folder = String();
  constructor(folder = String()) {
    this.#folder = folder;
  }
  
  get folder() {
    return this.#folder;
  }
}

module.exports = Directory;
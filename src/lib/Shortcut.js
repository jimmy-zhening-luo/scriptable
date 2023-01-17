// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
class Shortcut {
  #name = String();
  constructor(name = String()) {
    this.#name = name;
  }
  
  get name() {
    return this.#name;
  }
  
  toString() {
    return this.name;
  }
}

module.exports = Shortcut;
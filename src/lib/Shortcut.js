"use strict";
const Program = importModule("./system/Program");

class Shortcut extends Program {
  static get configRoot() {
    return [
      (
        (super.configRoot
          ?.constructor === String
        )?
          super.configRoot
          :String()
      ) ?? String(),
      String("Shortcut")
    ].join("/")
    ?? String();
  }
}

module.exports = Shortcut;

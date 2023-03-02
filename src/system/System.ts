class System {
  static get Shortcut(): typeof Shortcut {
    return importModule("Shortcut");
  }
}

module.exports = System;

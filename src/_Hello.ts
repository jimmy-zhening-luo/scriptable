// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: circle;
"use strict";

import type { Shortcut } from "./system/Shortcut";

namespace _Hello {
  const shortcut = importModule<typeof Shortcut>("./system/Shortcut");

  export class _Hello extends shortcut<
    never,
    string,
    Field<never, "space">
  > {
    protected runtime() {
      const FILE = "worldtime",
      warning = [
        this.readful(),
        this.stringful(this.setting.space, "setting.space"),
        this.read(FILE),
      ].join("");

      this.write(`World!\n(Previous: ${this.time()})`, FILE);
      logWarning(warning);

      return warning;
    }
  }
}

(new _Hello._Hello).run();

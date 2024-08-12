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
      const hello = this.readful() satisfies stringful,
      { space } = this.setting,
      spaceful = this.stringful(space, "setting.space") satisfies stringful,
      PATH_WORLDTIME = "worldtime",
      worldtime = this.read(PATH_WORLDTIME),
      warning = `${hello satisfies stringful}${spaceful satisfies stringful}${worldtime}`;

      this.write(`World!\n(Previous: ${this.timestamp()})`, PATH_WORLDTIME);
      logWarning(warning);

      return warning;
    }
  }
}

(new _Hello._Hello).run();

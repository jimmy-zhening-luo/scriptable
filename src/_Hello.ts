// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: circle;
"use strict";

namespace _Hello {
  const shortcut = importModule("system/Shortcut");

  export class _Hello extends shortcut<
    never,
    string,
    Field<never, "space">
  > {
    protected runtime() {
      const F_WORLDTIME = "worldtime",
      HELLO = this.readful(),
      worldtime = this.read(F_WORLDTIME),
      SPACE = this.stringful(
        this.setting.space ?? "",
        "space",
      ),
      warning = `${HELLO}${SPACE}${worldtime}`;

      this.write(
        `World!\n(Previous: ${(new Date).toISOString()})`,
        F_WORLDTIME,
      );
      logWarning(warning);

      return warning;
    }
  }
}

(new _Hello._Hello).run();

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
      const PATH_WORLDTIME = "worldtime",
      hello = this.readful(),
      space = this.stringful(
        this.setting.space ?? "",
        "space",
      ),
      worldtime = this.read(PATH_WORLDTIME),
      warning = [
        hello satisfies stringful,
        space satisfies stringful,
        worldtime satisfies string,
      ].join("");

      this.write(
        `World!\n(Previous: ${this.timestamp})`,
        PATH_WORLDTIME,
      );
      logWarning(warning);

      return warning;
    }
  }
}

(new _Hello._Hello).run();

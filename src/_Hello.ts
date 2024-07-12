// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: circle;
"use strict";

namespace _Hello {
  const shortcut = importModule(`system/Shortcut`) as typeof Shortcut;

  export class _Hello extends shortcut<
    never,
    string,
    Field<never, "space">
  > {
    protected runtime() {
      this.debug = true;

      const FILENAME_WORLDTIME = "worldtime";
      const HELLO = this.readful();
      const worldtime = this.read(
        "txt",
        FILENAME_WORLDTIME,
      );
      const SPACE = this.stringful(
        this.setting.space ?? "",
        "space",
      );
      const notification = `${HELLO}${SPACE}${worldtime}`;

      this.write(
        `World!\n(Previous: ${
          new Date()
            .toISOString()
        })`,
        "txt",
        FILENAME_WORLDTIME,
      );
      console.warn(notification);

      return notification;
    }
  }
}

new _Hello._Hello(true)
  .run();

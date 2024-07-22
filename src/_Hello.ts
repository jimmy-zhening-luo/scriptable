// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: circle;
"use strict";

namespace _Hello {
  const shortcut = importModule<typeof Shortcut>(`system/Shortcut`);

  export class _Hello extends shortcut<
    never,
    string,
    Field<never, "space">
  > {
    protected runtime() {
      this.debug = true;

      const FILENAME_WORLDTIME = "worldtime",
        HELLO = this.readful(),
        worldtime = this.read(
          "txt",
          FILENAME_WORLDTIME,
        ),
        SPACE = this.stringful(
          this.setting.space ?? "",
          "space",
        ),
        notification = `${HELLO}${SPACE}${worldtime}`;

      this.write(
        `World!\n(Previous: ${(new Date).toISOString()})`,
        "txt",
        FILENAME_WORLDTIME,
      );
      console.warn(notification);

      return notification;
    }
  }
}

(new _Hello._Hello).run();

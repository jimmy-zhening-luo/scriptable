// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: handshake;
"use strict";

namespace _Hello {
  const shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class _Hello extends shortcut<
    never,
    string,
    HelloSetting
  > {
    public runtime() {
      this.debug = true;

      const FILENAME_WORLDTIME = "worldtime.txt";
      const HELLO = this
        .readful();
      const worldtime = this
        .read(
          FILENAME_WORLDTIME,
        );
      const SPACE = this
        .stringful(
          this
            .app
            ?.space ?? "",
          "setting.app.space",
        );
      const notification = `${
        HELLO
      }${
        SPACE
      }${
        worldtime
      }`;

      this
        .write(
          `World!\n(Previous: ${
            new Date()
              .toISOString()
          })`,
          FILENAME_WORLDTIME,
        );
      console
        .warn(
          notification,
        );

      return notification;
    }
  }
}

new _Hello._Hello(
  true,
)
  .run();

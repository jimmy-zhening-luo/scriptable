// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: handshake;
"use strict";

namespace Hello {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;
  const stringful: typeof Stringful = importModule("common/types/strings/Stringful") as typeof Stringful;

  export class Hello extends shortcut<
    null,
    string,
    HelloSetting
  > {
    public runtime(): string {
      this.debug = true;

      const FILENAME_WORLDTIME: string = "world-time.txt";
      const HELLO: stringful = this.readful();
      const world: string = this.read(
        FILENAME_WORLDTIME,
      );

      this.write(
        `World!\n(Previous: ${
          new Date()
            .toISOString()
        })`,
        FILENAME_WORLDTIME,
      );

      const SPACE: stringful = stringful(
        this.app["space"] ?? "",
        "app.space",
      );
      const message: string = HELLO + SPACE + world;

      console.warn(message);

      return message;
    }
  }
}

new Hello.Hello(true)
  .run();

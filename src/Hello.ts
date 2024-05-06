// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: handshake;
"use strict";

namespace Hello {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Hello extends shortcut<
    null,
    string,
    HelloSetting
  > {
    public runtime(): string {
      const FILE_WORLDTIME: string = "world-time.txt";
      const HELLO: stringful = this.readful();
      const world: string = this.read(
        FILE_WORLDTIME,
      );
      const SPACE: stringful = this.stringful(
        this.app["space"] ?? "",
        "app.space",
      );
      const message: string = HELLO + SPACE + world;

      this.debug = true;
      this.write(
        `World!\n(Previous: ${
          new Date()
            .toISOString()
        })`,
        FILE_WORLDTIME,
      );
      console.warn(message);

      return message;
    }
  }
}

new Hello.Hello(true)
  .run();

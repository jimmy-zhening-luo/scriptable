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
      try {
        const FILENAME_WORLDTIME: string = "world-time.txt";
        const HELLO: stringful = stringful(
          this.read(),
          "hello: default.txt",
        );
        const world: stringful = stringful(
          this.read(FILENAME_WORLDTIME),
          "world: " + FILENAME_WORLDTIME,
        );

        this.write(
          `World!\n(${new Date().toISOString()})`,
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
      catch (e) {
        throw new EvalError(
          `${this.constructor.name}: runtime`,
          { cause: e },
        );
      }
    }
  }
}

new Hello.Hello()
  .run();

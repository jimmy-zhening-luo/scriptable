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
        const WORLD_FILE: string = "world.txt";
        const WORLD_PREFIX: string = "World: ";
        const SPACE_SETTING: string = "space";
        const hello: stringful = stringful(this.read());
        const world: stringful = stringful(this.read(WORLD_FILE));

        this.write(
          WORLD_PREFIX + new Date().toISOString(),
          WORLD_FILE,
        );

        const space: stringful = stringful(this.app[SPACE_SETTING] ?? "");
        const message: string = hello + space + world;

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

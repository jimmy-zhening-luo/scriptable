// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: play;
"use strict";

namespace New {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class New extends shortcut<
    null,
    string,
    NewSetting
  > {
    public runtime(): string {
      try {
        const WORLD_FILE: string = "world.txt";
        const WORLD_PREFIX: string = "World: ";
        const SPACE_SETTING: string = "space";
        const E_MISSING_SETTING: string = "{E_MISSING_SETTING}";
        const hello: string = this.read();
        const world: string = this.read(WORLD_FILE);

        this.write(
          WORLD_PREFIX + new Date()
            .toString(),
          WORLD_FILE,
        );

        // Setting
        const space: string = this.app[
          SPACE_SETTING
        ] ?? E_MISSING_SETTING;

        console.warn(hello + space + world);

        return hello + space + world;
      }
      catch (e) {
        throw new EvalError(
          `New: runtime`,
          { cause: e },
        );
      }
    }
  }
}

new New.New()
  .run();

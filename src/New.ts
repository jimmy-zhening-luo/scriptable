// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: play;
"use strict";

namespace New {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  export class New extends shortcut<
    null | NewInput,
    string | NewOutput,
    NewSetting
  > {
    public runtime(): string {
      try {
        const WORLD_FILE = "world.txt";
        const WORLD_PREFIX = "World: ";
        const SPACE_SETTING = "space";
        const E_MISSING_SETTING = "{E_MISSING_SETTING}";

        // Storage
        const hello: string = this.read();
        const world: string = this.read(
          WORLD_FILE,
        );

        this.write(
          WORLD_PREFIX + new Date().toString(),
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
          `New: runtime: \n${e as string}`,
        );
      }
    }
  }
}

new New.New()
  .run();
Script.complete();

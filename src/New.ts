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
    Record<string, never> | NewSetting
  > {
    public runtime(): string {
      try {
        const hello: string = this.read(
          ""
        );
        
        return "Hello World";
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

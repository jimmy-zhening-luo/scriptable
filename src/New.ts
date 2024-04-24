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
        return "";
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

new New.New()
  .run();

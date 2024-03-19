// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: play;
"use strict";

namespace GPT {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  export class GPT extends shortcut {
    public runtime(): string {
      try {
        return "Hello World";
      }
      catch (e) {
        throw new EvalError(`GPT: runtime: Error running app: \n${e as string}`);
      }
    }
  }
}

new GPT.GPT()
  .run();
Script.complete();

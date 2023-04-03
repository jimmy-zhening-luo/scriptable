// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: share;
"use strict";

namespace HelloScriptable {
  const scriptable: typeof Scriptable = importModule("system/Scriptable");

  export class HelloScriptable extends scriptable {
    runtime(): void {
      try {
        console.log("Hello, Scriptable!");
      } catch (e) {
        throw new EvalError(
          `HelloScriptable: runtime: Error running app: \n${e}`,
        );
      }
    }
  }
}

new HelloScriptable.HelloScriptable().run();

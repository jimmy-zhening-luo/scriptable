// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: share;
"use strict";

namespace Amazon {
  const shortcut: typeof Shortcut = importModule(
    "system/Shortcut",
  ) as typeof Shortcut;

  export class Amazon extends shortcut {
    runtime(): boolean {
      try {
        const storageFilename: string = "last-run.txt";
        const latestRunString: string = this.readStorage(storageFilename);
        const latestRunTime: Date
          = latestRunString === ""
            ? new Date()
            : new Date(latestRunString)
              .toString() === "Invalid Date"
              ? new Date()
              : new Date(latestRunString);

        this.writeStorage(new Date()
          .toISOString(), storageFilename);

        return Date.now() - latestRunTime.getTime() > 300000;
      }
      catch (e) {
        throw new EvalError(`Amazon: runtime: Error running app: \n${e}`);
      }
    }
  }
}

new Amazon.Amazon()
  .run();
Script.complete();

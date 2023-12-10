// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: share;
"use strict";
var Amazon;
(function (Amazon_1) {
    const shortcut = importModule("system/Shortcut");
    class Amazon extends shortcut {
        runtime() {
            try {
                const storageFilename = "last-run.txt";
                const latestRunString = this.readStorage(storageFilename);
                const latestRunTime = latestRunString === ""
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
    Amazon_1.Amazon = Amazon;
})(Amazon || (Amazon = {}));
new Amazon.Amazon()
    .run();
Script.complete();

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: orange; icon-glyph: share;
namespace Amazon {
  const shortcut: typeof Shortcut = importModule("system/Shortcut");

  export class Amazon extends shortcut {
    runtime(): boolean {
      try {
        const storageFilename: string = "last-run.txt";
        const latestRunString: string = this.readStorage(storageFilename);
        const latestRunTime: Date =
          latestRunString === ""
            ? new Date()
            : new Date(latestRunString).toString() === "Invalid Date"
            ? new Date()
            : new Date(latestRunString);
        this.writeStorage(new Date().toISOString(), storageFilename);
        return Date.now() - latestRunTime.getTime() > 300000;
      } catch (e) {
        throw new Error(`Amazon: runtime: Error running app: ${e}`);
      }
    }
  }
}

new Amazon.Amazon().run();

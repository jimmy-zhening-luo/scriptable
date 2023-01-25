// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
const Shortcut = importModule("./lib/Shortcut");

class Amazon extends Shortcut {
  runtime(): boolean {
    const storageFilename: string = "last-run.txt";
    
    const latestRunString: string = this
      ["readStorage"](storageFilename);
    const latestRunTime: Date = (
      (latestRunString === String())?
        new Date()
        :new Date(latestRunString)
    )
    ?? new Date();
    
    this["writeStorage"](
      (new Date()).toISOString(),
      storageFilename
    );
    return (Date.now() - latestRunTime.getTime()) > 300000;
  }
}

(new Amazon())["run"]();

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
const Shortcut = importModule("./lib/Shortcut");

const Amazon = new Shortcut("data", ")

class Amazon extends Shortcut {
  static run() {
    const latestRunData = Amazon
      .loadData(
        "last-run.txt"
      )
      ?.toString();
    const latestRun = (
      (latestRunData === String())?
        new Date()
        :new Date(latestRunData)
    )
    ?? new Date();
    this
    .saveData(
      dataPath,
      (new Date()).toISOString()
    )
    return (
      (
        Date.now()
        - latestRun.getTime()
      )
      > 300000
    );
  }
}

return Amazon.run();

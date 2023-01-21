// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
"use strict";
const Shortcut = importModule("lib/Shortcut");

class Amazon extends Shortcut {
  static run() {
    const dataPath = "last-run.txt";
    const latestRunData = this
      .loadData(
        dataPath
      )
      ?.toString()
    ?? String();
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

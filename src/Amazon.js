// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
const File = importModule("File");
// const Folder = importModule("Folder");

const data = Object.freeze({
  files: {
    latestRun: new File.ShortcutsDataFile(
      "Amazon/last-run.txt"
    )
  }
});

console.log(data.files.latestRun.data)

const latestRun = (
  (data.files.latestRun instanceof File)?
    data.files.latestRun.data :
    String()
);

console.log("latestRun string: " + latestRun)

const latestRunTime = (
  (latestRun === String())?
    new Date() :
    new Date(latestRun)
);

data.files.latestRun.write(
  (new Date()).toISOString(),
  true
);

console.log(
  "lastRun: "
  + latestRunTime
);
console.log(
  "min since last: "
  + (
      (
        Date.now()
        -
        latestRunTime
      )
      /
      60000
    )  
);

return (
  (
    Date.now()
    -
    latestRunTime.getTime()
  )
  >
  300000
);
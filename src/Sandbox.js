// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: magic;
// CONTROL
const fm = FileManager.iCloud();
const root = fm.bookmarkedPath("iCloud/Shortcuts/Data");
const subpath = "Amazon";
const directoryPath = fm.joinPath(root, subpath);
const ls = fm.listContents(directoryPath);
// console.log(ls)

// FILES
// const Test = importModule("Test");
const File = importModule("File");

const fa = new File.ShortcutsConfigFile("Search/search.json");

console.log(fa.setting.engineKeys);
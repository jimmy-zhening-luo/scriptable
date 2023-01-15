// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: magic;
// const Test = importModule("Test");
const File = importModule("File");

const files = new Array();

const fa = new File.ShortcutsConfigFile("Search/search.json");
files.push(fa);

console.log(fa.data.app)
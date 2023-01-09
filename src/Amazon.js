// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
const File = importModule("File");

const f = new File.ShortcutsDataFile("Amazon", "order-last-opened.txt");

const lastRunTime = new Date(f.data);

f.write((new Date()).toISOString(), true);

console.log(lastRunTime);
console.log(f.path);
console.log(f.bookmark)
console.log(f.bookmarkedPath)
console.log(f.parent)
console.log(f.file)
console.log(f.fileExists)
console.log(f.parentExists)
console.log(f.subpath)
f.shortcut = "Apple";
console.log(f.path);
console.log(f.parent);
console.log(f.file)
console.log(f.fileExists);
console.log(f.parentExists);
console.log(f.subpath)

return ((Date.now() - lastRunTime.getTime()) > 300000);
// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: teal; icon-glyph: magic;
const File = importModule("File");

const f = new File.ShortcutsDataFile("Amazon", "order-last-opened.txt");

const lastRunTime = new Date(f.data);

f.write((new Date()).toISOString());

return ((Date.now() - lastRunTime.getTime()) > 300000);

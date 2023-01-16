// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: magic;
const File = importModule("File");

const config = new File.ShortcutsConfigFile("Search/search.json");

const p = "././././././Foo/./Bar/Bing";

config.cd(p);

console.log(config.path)
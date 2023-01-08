// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic;
class File {
  #bookmark = String();
  #subpath = String();
  constructor (bookmark = String(), subpath = String()) {
    this.#bookmark = bookmark;
    this.#subpath = subpath;
  }
  
  get bookmark() {
    return this.#bookmark;
  }
  
  get bookmarkedPath() {
    const fm = FileManager.local();
    return fm.bookmarkedPath(this.bookmark);
  }
  
  get data() {
    const fm = FileManager.local();
    return fm.readString(this.path);
  }
  
  get path() {
    const fm = FileManager.local();
    return fm.joinPath(this.bookmarkedPath, this.subpath);
  }
  
  get subpath() {
    return this.#subpath;
  }
  
  toString() {
    return this.data;
  }
  
  write(data = String()) {
    const fm = FileManager.local();
    fm.writeString(this.path, data);
  }
}

class ShortcutsConfigFile extends File {
  constructor (shortcut = String(), subpath = String()) {
    const fm = FileManager.local();
    super("Repositories/Shortcuts/config", fm.joinPath(shortcut, subpath));
  }
  
  write(data = String()) {
    throw new TypeError("File::ShortcutsConfigFile: Cannot overwrite a config file.");
  }
}

class ShortcutsDataFile extends File {
  constructor (shortcut = String(), subpath = String()) {
    const fm = FileManager.local();
    super("iCloud/Shortcuts/Data", fm.joinPath(shortcut, subpath));
  }
}

module.exports = File;
module.exports.File = File;
module.exports.ShortcutsConfigFile = ShortcutsConfigFile;
module.exports.ShortcutsDataFile = ShortcutsDataFile;





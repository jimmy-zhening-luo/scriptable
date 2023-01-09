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
    const bookmarkedPath = this.constructor.Manager.bookmarkedPath(this.bookmark);
    
    return ((bookmarkedPath === undefined)? String() : bookmarkedPath);
  }
  
  get data() {
    return this.constructor.Manager.readString(this.path);
  }
  
  get fileExists() {
    return (this.parentExists && this.constructor.Manager.fileExists(this.path));
  }
  
  get path() {
    return this.constructor.Manager.joinPath(this.bookmarkedPath, this.subpath);
  }
  
  get parent() {
    return ((this.parentSubpath === this.subpath)? String() : this.path.split("/").slice(0, -1).join("/"));
  }
  
  get parentExists() {
    return this.constructor.Manager.isDirectory(this.parent);
    }
    
  get parentFile() {
    const parent = this;
    parent.subpath = this.parentSubpath;
    return parent;
  }
  
  get parentSubpath() {
    return this.subpath.split("/").slice(0, -1).join("/");
  }
  
  get subpath() {
    return this.#subpath;
  }
  
  set subpath(subpath = String()) {
    this.#subpath = subpath;
  }
  
  read() {
    return this.data;
  }
  
  toString() {
    return this.read();
  }
  
  write(data = String(), overwrite = false) {
    if (this.fileExists && overwrite !== true) {
      throw new ReferenceError("File: write: File already exists. To overwrite existing data, write must be called with overwrite: true.");
    } else {
      if (!(this.parentExists)) {
        this.constructor.Manager.createDirectory(this.parent, true);
        }
        this.constructor.Manager.writeString(this.path, data);
    }
  }
  
  static get Manager() {
    return FileManager.local();
  }
}

class CloudFile extends File {
  constructor (bookmark = String(), subpath = String()) {
    super(bookmark, subpath);
  }
  
  static get Manager() {
    return FileManager.iCloud();
  }
}

class RepoFile extends File {
  
}

class ScriptableFile extends CloudFile {
  constructor(script = String()) {
    super("iCloud/Scriptable", script);
  }
}

class ScriptableRepoFile extends RepoFile {
  #branch = new Branch();
  constructor(dir = String(), subpath = String(), branch = new Branch()) {
    
  }
}

class ShortcutsConfigFile extends File {
  #shortcut = String();
  #file = String();
  constructor (shortcut = String(), file = String()) {
    super("Repositories/Shortcuts/config", FileManager.local().joinPath(shortcut, file));
    this.#shortcut = shortcut;
    this.#file = file;
  }
  
  get shortcut() {
    return this.#shortcut;
  }
  
  set shortcut(shortcut = String()) {
    this.#shortcut = shortcut;
    super.subpath = this.constructor.Manager.joinPath(shortcut, this.file);
  }
  
  get file() {
    return this.#file;
  }
  
  set file(file = String()) {
    this.#file = file;
    super.subpath = this.constructor.Manager.joinPath(this.shortcut, file);
  }
  
  get subpath() {
    return super.subpath;
  }
  
  set subpath(subpath = String()) {
    let preTrimPath = subpath.trim();
    while (preTrimPath.startsWith("/")) {
      preTrimPath = preTrimPath.slice(1);
    }
    let postTrimPath = preTrimPath;
    while (postTrimPath.endsWith("/")) {
      postTrimPath = postTrimPath.slice(0, -1);
    }
    if (postTrimPath.split("/").length > 2) {
      throw new ReferenceError("File::ShortcutsConfigFile:set subpath: subpath must be of form empty string, shortcut, or shortcut/file.");
    } else {
      super.subpath = postTrimPath.join("/");
      this.shortcut = (postTrimPath.length>0)? postTrimPath.shift() : String();
      this.file = (postTrimPath.length>0)? postTrimPath.shift() : String();
    }
  }
  
  write(data = String()) {
    throw new ReferenceError("File::ShortcutsConfigFile:write: Cannot overwrite a protected config file.");
  }
}

class ShortcutsDataFile extends CloudFile {
  #shortcut = String();
  #file = String();
  constructor (shortcut = String(), file = String()) {
    super("iCloud/Shortcuts/Data", FileManager.iCloud().joinPath(shortcut, file));
    this.#shortcut = shortcut;
    this.#file = file;
  }
  
  get shortcut() {
    return this.#shortcut;
  }
  
  set shortcut(shortcut = String()) {
    this.#shortcut = shortcut;
    super.subpath = this.constructor.Manager.joinPath(shortcut, this.file);
  }
  
  get file() {
    return this.#file;
  }
  
  set file(file = String()) {
    this.#file = file;
    super.subpath = this.constructor.Manager.joinPath(this.shortcut, file);
  }
  
  get subpath() {
    return super.subpath;
  }
  
  set subpath(subpath = String()) {
    let preTrimPath = subpath.trim();
    while (preTrimPath.startsWith("/")) {
      preTrimPath = preTrimPath.slice(1);
    }
    let postTrimPath = preTrimPath;
    while (postTrimPath.endsWith("/")) {
      postTrimPath = postTrimPath.slice(0, -1);
    }
    if (postTrimPath.split("/").length > 2) {
      throw new ReferenceError("File::CloudFile::ShortcutsDataFile:set subpath: subpath must be of form shortcut/file.");
    } else {
      super.subpath = postTrimPath.join("/");
      this.shortcut = (postTrimPath.length>0)? postTrimPath.shift() : String();
      this.file = (postTrimPath.length>0)? postTrimPath.shift() : String();
    }
  }
}

module.exports = File;
module.exports.File = File;
module.exports.CloudFile = CloudFile;
module.exports.RepoFile = RepoFile;
module.exports.ScriptableFile = ScriptableFile;
module.exports.ScriptableRepoFile = ScriptableRepoFile;
module.exports.ShortcutsConfigFile = ShortcutsConfigFile;
module.exports.ShortcutsDataFile = ShortcutsDataFile;


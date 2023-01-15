// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: magic;
// const Repository = importModule("Repository");
class File {
  #subpath = String();
  #bookmark = String();
  #m = FileManager.local();
  constructor (
    subpath = String(),
    bookmark = String()
  ) {
    const isString = function (obj) {
      return obj?.constructor === String;
    };
    
    this.subpath = isString(subpath)?
      subpath
      :String();
      
    this.#bookmark = isString(bookmark)?
      bookmark
      :String();
      
    this.#m = this.constructor.Manager;
  }
  
  get bookmark() {
    return this.#bookmark ?? String();
  } 
  
  get bookmarkedPath() {
    const path = this.#m.bookmarkedPath(
      this.bookmark
    );
    return path ?? String();
  }
  
  get data() {
    try {
      if (!this.isReadable) {
        const e = new ReferenceError(
          "(unhandled reason)",
          this.path
        );
        if (!this.exists)
          e.message = "path resolves to neither an existing file nor folder";
        else if (this.isDirectory)
          e.message = "path resolves to a folder, not to a file";
        
        throw e;
      } else {
        const data = this.#m.readString(
          this.path
        );
        if (data?.constructor !== String)
          throw new ReferenceError(
            "Scriptable native FileManager object returned a non-String value when expecting a string"
          );
        else {
          return data ?? String();
        }
      }
    } catch (e) {
      console.warn("File:data: Cannot read data because " + e);
      return String();
    }
  }
  
  get descendants() {
    if (!(this.exists)) {
      if (this.self.exists)
        return [this.self];
      else return [];
    }
    else {
      const subpaths = this.ls.map(
        (item) => (
          this.self.constructor.joinPaths(
            this.subpath,
            item
          )
        )
      );
      
      const folders = subpaths.map(
        (subpath) => (
          new this.constructor(
            new this.self.constructor(
              subpath
            )
          )
        )
      );
      
      const desc = new Array();
      for (const folder of folders) {
        const fDesc = folder.descendants;
        if (fDesc !== undefined
          && fDesc !== null
          && Array.isArray(fDesc)
          && fDesc.length > 0
        ) desc.push(...fDesc);
      }
      return desc;
    }
  }
  
  get exists() {
    return (
      this.parentExists
      && this.#m.fileExists(this.path)
    );
  }
  
  get isBottom() {
    return !!this.isFile;
  }
  
  get isDirectory() {
    return !!this.#m.isDirectory(
      this.path
    );
  }
  
  get isEnumerable() {
    return !!this.isDirectory;
  }
  
  get isFile() {
    return (
      this.exists
      && !this.isDirectory
    );
  }
  
  get isReadable() {
    return !!this.isFile;
  }
  
  get isTop() {
    return (
      this.subpath === this.parentSubpath
    );
  }
  
  get ls() {
    return this.isDirectory?
      (
        this.#m.listContents(this.path)
        ?? new Array()
      )
      :new Array();
  }
  
  get parent() {
    return new this.constructor(
      this.parentSubpath
    ) ?? new this.constructor();
  }
  
  get parentExists() {
    return !!this.parent?.isDirectory;
  }
  
  get parentPath() {
    return this.parent?.path ?? String();
  }
  
  get parentSubpath() {
    return this.subpath.split("/").slice(0, -1).join("/") ?? String();
  }
  
  get path() {
    return this.constructor.joinPaths(
      this.bookmarkedPath,
      this.subpath
    ) ?? String();
  }
  
  get subpath() {
    return this.#subpath ?? String();
  }
  
  set subpath(path = String()) {
    this.#subpath =  this.constructor.trimPath(path) ?? String();
  }
  
  read() {
    return this.data ?? String();
  }
  
  toString() {
    return this.path ?? String();
  }
  
  write(
    data = String(),
    overwrite = false
  ) {
    if (this.isDirectory)
      throw new ReferenceError(
        "File:write: File path points to a folder. Cannot write data to a folder."
      );
    else if (
      this.exists
      && overwrite !== true
    ) throw new ReferenceError(
        "File:write: File already exists. To overwrite existing data, write must be called with overwrite === true."
      );
    else {
      if (!this.parentExists) {
        this.#m.createDirectory(
          this.parentPath,
          true
        );
      }
      this.#m.writeString(
        this.path,
        data
      );
    }
  }
  
  static get Manager() {
    try {
      const m = FileManager?.local() ?? null;
      return m;
    } catch (e) {
      console.error("Fatal: File:Manager: Failed to get a FileManager instance from the Scriptable  native library FileManager. See. caught error: " + e);
      return null;
    }
  }
  
  static joinPaths(
    l = String(),
    r = String()
  ) {
    l = this.trimPath(l) ?? String();
    r = this.trimPath(r) ?? String();
    
    return l === String()?
      r
      :r === String()?
        l
        :this.Manager.joinPath(l, r);
  }
  
  static trimPath(
    path = String()
  ) {
    if (path?.constructor !== String) {
      if (Array.isArray(path)) {
        const p1 = path.flat(
          Infinity
        )?.shift() ?? String();
        path = p1?.constructor === String?
          first
          :String()
      }
      else path = String();
    }
    
    path = path?.trim() ?? String();
    while (path.startsWith("/"))
      path = path.slice(1);
    while (path.endsWith("/"))
      path = path.slice(0, -1);
    path = path?.trim() ?? String();
    
    return path ?? String();
  }
}

class CloudFile extends File {
  static get Manager() {
    return FileManager.iCloud();
  }
}

class ConfigFile extends File {
  get app() {
    return this.config?.app ?? new Object();
  }
  
  get config() {
    const Config = importModule("Config");
    try {
      const data = super.data;
      if (data?.constructor !== String)
        throw new ReferenceError(
          "super.data returned non-string value when expecting string"
        );
      else if (data === String())
        throw new SyntaxError(
          "super.data returned empty string when string contIning parsable JSON was expected"
        );
      else {
        const config = new Config(
          data,
          this.path
        ) ?? null;
        if (config === null)
          throw new ReferenceError(
            "Config() returned undefined or null when expecting an instance of Config"
          );
        else if (!(
          config instanceof Config
        ))
          throw new ReferenceError(
            "Config() returned a non-nullish, but non-Config value when expecting an instance of Config"
          );
        else return config;
      }
    } catch (e) {
      console.warn(
        "File::ConfigFile:config: failed to parse super.data into a Config object. See caught error: "
        + e
      );
      return null;
    }
  }
  
  get data() {
    return this.config?.data ?? new Object();
  }
  
  get setting() {
    return this.config?.setting ?? new Object();
  }
  
  get settingAppEnforced() {
    return this.config?.settingAppEnforced ?? new Object();
  }
  
  get settingUserOverrideAllowed() {
    return this.config?.settingUserOverrideAllowed?? new Object;
  }
  
  get user() {
    return this.config?.user ?? new Object();
  }
  
  write() {
    throw new ReferenceError("File::ShortcutsConfigFile:write: Cannot overwrite a protected config file.");
  }
}

class RepoFile extends File {
  #repo = new Repository();
  constructor(
    subpath = String(),
    bookmark = new String(),
    repo = new Repository()
  ) {
    super(
      subpath,
      bookmark
    );
    this.#repo = repo;
  }
}

class ScriptableFile extends CloudFile {
  constructor(
    script = String()
  ) {
    super(
      script,
      "iCloud/Scriptable"
    );
  }
}

class ScriptableConfigFile extends ConfigFile {
  
}

class ScriptableRepoFile extends RepoFile {
  constructor(
    subpath = String(),
    repo = new Repository()
  ) {
    super(
      subpath,
      "Repositories/Scriptable",
      repo
    );
  }
}

class ShortcutsConfigFile extends ConfigFile {
  constructor (
    subpath = String()
  ) {
    super(
      subpath,
      "Repositories/Shortcuts/config"
    );
  }
}

class ShortcutsDataFile extends CloudFile {
  constructor (
    subpath = String()
  ) {
    super(
      subpath,
      "iCloud/Shortcuts/Data"
    );
  }
}

module.exports = File;
module.exports.File = File;
module.exports.CloudFile = CloudFile;
module.exports.ConfigFile = ConfigFile;
module.exports.RepoFile = RepoFile;
module.exports.ScriptableFile = ScriptableFile;
module.exports.ScriptableConfigFile = ScriptableConfigFile;
module.exports.ScriptableRepoFile = ScriptableRepoFile;
module.exports.ShortcutsConfigFile = ShortcutsConfigFile;
module.exports.ShortcutsDataFile = ShortcutsDataFile;

class Config {
  #data = new Object();
  #source = undefined;
  #parsed = false;
  constructor(
    data = String(),
    source = undefined
  ) {
    this.#parsed = false;
    this.#source = source;
    try {
      if (data?.constructor !== String)
        throw new TypeError(
          "non-string data passed to setter when expecting string"
        );
      if (data === String())
        throw new SyntaxError(
          "empty string data when expected non-empty string"
        );
      else {
        this.#data = JSON.parse(data);
        if (this.#data instanceof Object)
          this.#parsed = true;
        else 
          throw new SyntaxError(
            "Json parser did not throw error when parsing the data, but returned parsed results that were not an Object"
          );
      }
    } catch (e) {
      console.warn("Config:set data: data string could not be parsed into an Object. See caught error: " + e);
      this.#parsed = false;
      this.#data = new Object();
    }
  }
  
  get app() {
    return this.data?.app ?? new Object();
  }
  
  get data() {
    return this.#data ?? new Object();
  }
  
  get parsed() {
    return this.#parsed === true;
  }
  
  get setting() {
    return this.settingUserOverrideAllowed ?? new Object();
  }
  
  get settingAppEnforced() {
    return this.constructor.mergeObjects(
      this.app ?? new Object(),
      this.user ?? new Object()
    ) ?? new Object();
  }
  
  get settingUserOverrideAllowed() {
    return this.constructor.mergeObjects(
      this.user ?? new Object(),
      this.app ?? new Object()
      ) ?? new Object();
  }
  
  get source() {
    return this.#source;
  }
  
  get user() {
    return this.data?.user ?? new Object();
  }
  
  static mergeObjects(
    winners = new Object(),
    losers = new Object()
  ) {
    const mergePrimitives = function(
      winner = String(),
      loser = String()
    ) {
      return (winner ?? loser) ?? String();
    };
    
    const mergeArrays = function(
      winner = new Array(),
      loser =  new Array()
    ) {
      return (
        (Array.isArray(winner)?
          winner
          :new Array()
        )?.concat(
          (Array.isArray(loser)?
            loser
            :new Array()
          )
        )
      ) ?? new Array();
    };
    
    const primitive = function(
      obj = new Object()
    ) {
      return (
        obj?.constructor === String
        || obj?.constructor === Number
        || obj?.constructor === Boolean
      );
    };
    
    const intersectKeys = function(
      a = new Object(),
      b = new Object()
    ) {
      return Object.keys(a)?.filter(
        (aKey) => (
          Object.keys(b)?.includes(aKey)
        )
      ) ?? new Array();
    };
    
    const uniqueKeysOf = function(
      obj = new Object(),
      intersection = new Array()
    ) {
      return Object.keys(obj)?.filter(
        (objKey) => (
          !intersection?.includes(objKey)
        )
      ) ?? new Array();
    };
    
    const intersection = intersectKeys(
      winners ?? new Object(),
      losers ?? new Object()
    ) ?? new Array(); 
    
    const uniqueWinners = uniqueKeysOf(
      winners ?? new Object(),
      intersection ?? new Array()
    ) ?? new Array();
    const uniqueLosers = uniqueKeysOf(
      losers ?? new Object(),
      intersection ?? new Array()
      ) ?? new Array();
      
    const merger = new Map();
    for (const l of uniqueLosers)
      merger.set(l, losers[l]);
    for (const w of uniqueWinners)
      merger.set(w, winners[w]);
    for (const i of intersection) {
      if (winners[i] === undefined
        || winners[i] === null
      ) merger.set(i, losers[i]);
      else if (losers[i] === undefined
        || losers[i] === null
      ) merger.set(i, winners[i]);
      else if (primitive(winners[i])
        && primitive(losers[i])
      ) merger.set(i, mergePrimitives(
          winners[i],
          losers[i]
        )
      );
      else if (Array.isArray(winners[i])
        && Array.isArray(losers[i])
      ) merger.set(i, mergeArrays(
          winners[i],
          losers[i]
        )
      );
      else if (Array.isArray(winners[i]))
        merger.set(i, mergeArrays(
          winners[i],
          [losers[i]]
        )
      );
      else if (Array.isArray(losers[i]))
        merger.set(i, mergeArrays(
          [winners[i]],
          losers[i]
        )
      );
      else
        merger.set(i, this.mergeObjects(
          winners[i],
          losers[i]
        )
      );
    }
    return (
      Object.fromEntries(merger)
      ?? new Object()
    );
  }
  
  toString() {
    return JSON.stringify(
      this.data ?? new Object()
    ) ?? String();
  }
}

class Repository {
  #remote = String();
  #branch = String();
  #sourceDir = String();
  #clientId = String();
  constructor(
    remote = String(),
    branch = String(),
    sourceDir = String(),
    client = new Object()
  ) {
    this.#remote = remote
      ?.constructor === String?
        remote
        :String();
    this.#branch = branch
      ?.constructor === String?
        branch
        :String();
    this.#sourceDir = sourceDir
      ?.constructor === String?
        sourceDir
        :String();
    this.#client = config
      ?.setting
      ?.global
      ?.clients
      ?.workingCopy
      ?? new Object();
  }
  
  get branch() {
    return this.#branch ?? String();
  }
  
  get client() {
    return this.#client ?? new Object();
  }
  
  get clone() {
    return this.#clone;
  }
  
  get key() {
    const File = importModule("File");
    return new File.SecretsFile(
      this.client?.keyDir ?? String()
      ?? String()
    )?.key;
  }
  
  get remote() {
    return this.#remote ?? String();
  }
  
  get sourceDir() {
    return this.#sourceDir ?? String();
  }
  
  checkout() {
    const url = this.#buildRepoClientUrl(
      "checkout",
      this.remote ?? String(),
      this.branch ?? String(),
      String()
    ) ?? String();
  }
  
  commit() {
    const url = this.#buildRepoClientUrl(
      "commit",
      this.remote ?? String(),
      String(),
      this.sourceDir ?? String()
      ) ?? String();
  }
  
  pull() {
    const url = this.#buildRepoClientUrl(
      "pull",
      this.remote ?? String(),
      String(),
      String()
      ) ?? String();
  }
  
  status() {
    const url = this.#buildRepoClientUrl(
      "status",
      this.remote ?? String(),
      String(),
      String()
      ) ?? String();
  }
  
  toString() {
    return [
      this.#remote ?? String(),
      this.#branch ?? String()
    ]?.join(":") ?? String();
  }
  
  #buildRepoClientUrl(
    action = String(),
    remote = String(),
    branch = String(),
    sourceDir = String()
  ) {
    const client = this
      .client
      ?? new Object();
    const scheme = client
      ?.scheme
      ?? String();
    const xCallbackPath = client
      ?.xCallbackPath
      ?? String();
      
    const actionObject = client
      ?.actions[action ?? String()]
      ?? new Object();
    const actionPath = actionObject
      ?.endpoint
      ?? String();
    
    const params = new Map();
    const paramNames = client
      ?.paramNames
      ?? new Object();
    params.set(
      paramNames?.key ?? String(),
      this.key ?? String()
    );
    if (remote?.constructor === String
      && remote !== String()
    ) params.set(
        paramNames?.remote ?? String(),
        remote ?? String()
    );
    if (branch?.constructor === String
      && branch !== String()
    ) params.set(
        paramNames?.branch ?? String(),
        branch ?? String()
    );
    if (sourceDir?.constructor === String
      && sourceDir !== String()
    ) params.set(
        paramNames?.sourceDir ?? String(),
        sourceDir ?? String()
    );
    const specialParams = actionObject
      ?.specialParams;
    if (specialParams instanceof Object)
      for (const [name, value] of Object.entries(
        specialParams
        )
      ) params.set(
          name ?? String(),
          value ?? String()
      );
      
    return buildUrl(
      scheme ?? String(),
      xCallbackPath ?? String(),
      actionPath ?? String(),
      params ?? new Map()
    ) ?? String();
      
    const buildUrl = function (
      scheme = String(),
      xCallbackPath = String(),
      actionPath = String(),
      params = new Map()
    ) {
      return [
        scheme ?? String(),
        xCallbackPath ?? String(),
        "/",
        action ?? String(),
        "?",
        params?.filter(
          ([name, value]) => (
            name?.constructor === String
            && name !== String()
            && value?.constructor === String
            && value !== String()
          )
        )?.map(
          ([name, value]) => (
            String(name)?.concat(
              "=",
              String(value)
            )
          )
        )?.join("&") ?? String()
      ].join("") ?? String();
    };
  }
}

class WorkingCopyRepository extends Repository {
  
}

class File {
  #subpath = String();
  #bookmark = String();
  #m = FileManager.local();
  constructor (
    subpath = String(),
    bookmark = String()
  ) {
    this.subpath = subpath
      ?.constructor === String?
        subpath
        :String();
    this.#bookmark = bookmark
      ?.constructor === String?
        bookmark
        :String();
    this.#m = this.constructor.Manager;
  }
  
  get bookmark() {
    return this.#bookmark ?? String();
  } 
  
  get bookmarkedPath() {
    return (
      this
      .constructor
      .trimPath(
        this
        .constructor
        .bookmarkToPath(
          this.bookmark
          ?? String()
        ) ?? String()
      ) ?? String()
    );
  }
  
  get data() {
    try {
      if (!this.isReadable) {
        if (!this.exists)
          throw new ReferenceError(
            "path resolves to neither an existing file nor folder"
          );
        else if (this.isDirectory)
          throw new ReferenceError(
            "path resolves to a folder, not to a file"
          );
        else
          throw new ReferenceError(
            "(unhandled reason)"
          );
      }
      else {
        const data = this
          .#m
          .readString(
            this.path
            ?? String()
          );
        if (data?.constructor !== String)
          throw new ReferenceError(
            "Scriptable native FileManager object returned a non-String value when expecting a string"
          );
        else
          return data ?? String();
      }
    } catch (e) {
      console.warn(
        "File:data: Cannot read data from file. See caught error "
        + e
      );
      return String();
    }
  }
  
  get descendants() {
    if (this.isFile)
      return [this];
    else if (this.isBottom)
      return new Array();
    else if (this.isDirectory) {
      const children = this.ls?.map(
        (leaf) => (
          this.constructor.joinPaths(
            this.subpath
              ?? String(),
            this.constructor.trimPath(
              leaf
              ?? String()
            ) ?? String()
          ) ?? String()
        )
      )?.map(
        (subpath) => (
          new this.constructor(
            subpath ?? String()
          )
          ?? new this.constructor()
        )
      )?.filter(
        (file) => (
          !this.path?.startsWith(
            file?.path ?? String()
          )
        )
      );
      
      return children?.map(
        (file) => (
          file?.descendants
          ?? new Array()
        )
      ) ?? new Array();
    }
    else
      return new Array();
  }
  
  get exists() {
    return (
      this.parentExists === true
      && this.#m.fileExists(this.path) === true
    );
  }
  
  get isBottom() {
    return (
      this.isFile === true
      || (Array.isArray(this.ls)
        && this.ls.length === 0
      )
    );
  }
  
  get isDirectory() {
    return this.#m.isDirectory(
      this.path
    ) === true;
  }
  
  get isEnumerable() {
    return this.isDirectory === true;
  }
  
  get isFile() {
    return (
      this.exists
      && !this.isDirectory
    );
  }
  
  get isReadable() {
    return this.isFile === true;
  }
  
  get isTop() {
    return (
      this.subpath === this.parentSubpath
    );
  }
  
  get leaf() {
    return this
    .constructor
    .trimPath(
      this
      .subpath
      ?.split("/")
      ?.slice(-1)
      ?? String()
    ) ?? String();
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
      ?? String()
    ) ?? new this.constructor();
  }
  
  get parentExists() {
    return this.parent?.isDirectory === true;
  }
  
  get parentIsSelf() {
    return this.isTop === true;
  }
  
  get parentPath() {
    return this.parent?.path ?? String();
  }
  
  get parentSubpath() {
    return this.constructor.trimPath(
      this.subpath
      ?.split("/")
      ?.slice(0, -1)
      ?.join("/")
      ?? String()
    ) ?? String();
  }
  
  get path() {
    return this.constructor.joinPaths(
      this.bookmarkedPath
        ?? String(),
      this.subpath 
        ?? String()
    ) ?? String();
  }
  
  get pathTree() {
    return this
    .constructor
    .pathToTree(
      this.path
      ?? String()
    ) ?? new Array();
  }
  
  get root() {
    return this.bookmarkedPath ?? String();
  }
  
  get subpath() {
    return this.constructor.trimPath(
      this.#subpath
      ?? String()
    ) ?? String();
  }
  
  get subpathTree() {
    return this.constructor
      .pathToTree(
        this.subpath
        ?? String()
        ) ?? new Array();
  }
  
  set subpath(path = String()) {
    path = path?.constructor === String?
      path
      :String();
    this.#subpath = this
    .constructor
    .trimPath(
      path
      ?? String()
    ) ?? String();
  }
  
  cd(
    relativePath = String()
  ) {
    relativePath = relativePath
      ?.constructor === String?
        relativePath
        :String();
    this.subpath = this
      .constructor
      .trimPath(
        this.subpathRelativeTo(
          this
          .constructor
          .trimPath(
            relativePath
            ?? String()
          ) ?? String()
        ) ?? String()
      ) ?? String();
  }
  
  pathRelativeTo(
    relativePath = String()
  ) {
    relativePath = relativePath
      ?.constructor === String?
        relativePath
        :String();
    return this
      .constructor
      .trimPath(
        this.constructor.walkPath(
          this.path ?? String(),
          this
          .constructor
          .trimPath(
            relativePath
            ?? String()
          ) ?? String()
        ) ?? String()
      ) ?? String();
  }
  
  read() {
    return this.data ?? String();
  }
  
  subpathRelativeTo(
    relativePath = String()
  ) {
    relativePath = relativePath
      ?.constructor === String?
        relativePath
        :String();
    return this
      .constructor
      .trimPath(
        this.constructor.walkPath(
          this.subpath ?? String(),
          this
          .constructor
          .trimPath(
            relativePath
            ?? String()
          ) ?? String()
        ) ?? String()
      ) ?? String();
  }
  
  toString() {
    return this.subpath ?? String();
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
      console.error("Fatal: File:Manager: Failed to get a FileManager.local() instance from the Scriptable  native library FileManager. See. caught error: " + e);
      return null;
    }
  }
  
  static bookmarkToPath(
    bookmark = String()
  ) {
    return (
      this.trimPath(
        this.Manager.bookmarkedPath(
          bookmark
          ?? String()
        ) ?? String()
      ) ?? String()
    );
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
  
  static pathToBookmark(
    path = String()
  ) {
    return new Map(
      this.Manager
      .allFileBookmarks()?.filter(
        (bmObject) => (
          bmObject?.source === "host"
        )
      )?.map(
        (bmObject) => (
          [
            this.trimPath(
              this.bookmarkToPath(
                bmObject?.name
                ?? String()
              ) ?? String()
            ),
            bmObject.name
            ?? String
          ]
        )
      )
    )?.get(
      this.trimPath(
        path
        ?? String()
      ) ?? String()
    ) ?? String();
  }
  
  static pathToTree(
    path = String()
  ) {
    return this.trimPath(
      path
      ?? String()
    )?.split(
      "/"
    )?.map((node) => (
        this.trimPath(
          node
          ?? String()
        )
      )
    )?.filter((node) => (
        node?.constructor === String
      )
    )?.filter((node) => (
        node?.trim() !== String()
      )
    ) ?? new Array();
  }
  
  static treeToPath(
    tree = new Array()
  ) {
    tree = Array.isArray(tree)?
      tree
      :new Array();
    const path = tree
    ?.filter((node) => (
        node?.constructor === String
      )
    )?.map((node) => (
        this.trimPath(
          node
          ?? String()
        )
      )
    )?.filter((node) => (
        node?.trim() !== String()
      )
    )?.join(
      "/"
    )?.trim();
    
    return this.trimPath(
      path
      ?? String()
    ) ?? String();
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
      } else path = String();
    }
    path = path?.trim() ?? String();
    while (path.startsWith("/"))
      path = path.slice(1);
    while (path.endsWith("/"))
      path = path.slice(0, -1);
    path = path?.trim() ?? String();
    return path ?? String();
  }
  
  static walkPath(
    path = String(),
    relativePath = String()
  ) {
    const pathTree = this.pathToTree(
      this.trimPath(
        path
        ?? String()
      )
      ?? String()
    ) ?? new Array();
    const relPathTree = this.pathToTree(
      this.trimPath(
        relativePath
        ?? String()
      )
      ?? String()
      ) ?? new Array();
    
    for (const node of relPathTree) {
      if (node.trim() === ".")
        pathTree.pop();
      else if (
        node?.constructor === String
        && node?.trim() !== String()
      )
        pathTree.push(String(node));
    }
    return this.trimPath(
      this.treeToPath(
        pathTree
        ?? new Array()
      ) ?? String()
    ) ?? String();
  }
}

class CloudFile extends File {
  static get Manager() {
    try {
      const m = FileManager?.iCloud() ?? null;
      return m;
    } catch (e) {
      console.error("Fatal: File:Manager: Failed to get a FileManager.iCloud() instance from the Scriptable  native library FileManager. See. caught error: " + e);
      return null;
    }
  }
}

class ConfigFile extends File {
  get app() {
    return this.config?.app ?? new Object();
  }
  
  get config() {
    try {
      const data = super.data;
      if (data?.constructor !== String)
        throw new ReferenceError(
          "super.data returned non-string value when expecting string"
        );
      else if (data === String())
        throw new SyntaxError(
          "super.data returned empty string when string containing parsable JSON was expected"
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
    return this.config?.settingUserOverrideAllowed ?? new Object();
  }
  
  get user() {
    return this.config?.user ?? new Object();
  }
  
  write() {
    throw new ReferenceError("File::ShortcutsConfigFile:write: Cannot overwrite a protected config file.");
  }
}

class SecretsFile extends File {
  constructor(
    subpath = String()
  ) {
    super(
      subpath ?? String(),
      "Local/Secrets"
    );
  }
  
  get key() {
    return this.secret ?? String();
  }
  
  get secret() {
    return this.data ?? String();
  }
  
  write() {
    throw new ReferenceError("File::SecretsFile:write: Cannot overwrite a protected secrets file.");
  }
}

class RepoFile extends File {
  #client;
  #repo;
  #clone;
  constructor (
    repoSubpath = String(),
    repoBookmark = String(),
    cloneSubpath = String(),
    cloneBookmark = String()
    appId = String(),
    repoType = String(),
    repoId = String(),
    clientId = String()
  ) {
    super(
      subpath ?? String(),
      bookmark ?? String()
    );
    
    const config = (new ScriptableConfigFile("repo.json"))
      ?.setting;
    
    clientId = (clientId?
      .constructor !== String
      || clientId === String)?
        config
          ?.setting
          ?.global
          ?.defaults
          ?.client
        :clientId;
    
    this.#client = config
      ?.setting
      ?.global
      ?.clients[clientId];
    
    

    this.#repo = new Repository(
      remote ?? String(),
      branch ?? String(),
      sourceDir ?? String(),
      clone instanceof File?
        clone
        :null,
      config ?? new Object()
    ) ?? null;
  }
  
  get branch() {
    return this.repo?.branch ?? String();
  }
  
  get clone() {
    return this.repo?.clone ?? String();
  }
  
  get remote() {
    return this.repo?.remote ?? String();
  }
  
  get repo() {
    return this.#repo ?? null;
  }
  
  get sourceDir() {
    return this.repo?.sourceDir
      ?? String();
  }
  
  mergeFromClone(
    repoFile
  ) {
    // check status, if changed commit and end.
    // else pull from remote.
    
    //   if error cannot merge, end
    //.  else check status, if changed commit and end. 
    //.      else checkout mergeFromClone branch (dev)
    // pull from remote again
    //   if error cannot merge, end
    //   else check status, if changed commit and end
    //  else delete dir & copy files
    //.   prompt commit & return true
    const success = false;
    return success;
  }
  
  write() {
    throw new ReferenceError("File::RepoFile:write: Cannot directly write to a repo file. Use mergeFromClone if you want to write files from your clone to your repo.");
  }
}

class SourceRepoFile extends RepoFile {
  constructor (
    subpath,
    bookmark,
    appId,
    repoId
    clone
  ) {
    
  }
}

class ScriptableFile extends CloudFile {
  constructor(
    script = String()
  ) {
    super(
      script ?? String(),
      "!HERE"
    );
  }
}

class ScriptableConfigFile extends ConfigFile {
  constructor (
    subpath = String()
  ) {
    super(
      subpath ?? String(),
      "Repositories/Scriptable/config"
    );
  }
}

class ScriptableSourceRepoFile extends SourceRepoFile {
  constructor (
    subpath = String()
  ) {
    const repoConfig = new File
      .ScriptableConfigFile(
        "repo.json"
      );
    const scriptableRepoConfig = repoConfig
      ?.setting
      ?.apps
      ?.Scriptable
      ?.repos
      ?.source
      ?.js;
      
    const bookmarkConfig = new File
      .ScriptableConfigFile(
        "bookmark.json"
      );
    const scriptableBookmarkConfig = bookmarkConfig
      ?.setting
      ?.apps
      ?.Scriptable
      ?.bookmarks;
    
    super(
      subpath ?? String(),
      scriptableBookmarkConfig
        ?.repo
        ?? String(),
      scriptableRepoConfig
        ?.remote
        ?? String(),
      scriptableRepoConfig
        ?.branches
        ?.mergeFromClone
        ?? String(),
      scriptableRepoConfig
        ?.sourceDir
        ?? String(),
      new ScriptableFile(
        subpath ?? String()
      ) ?? null
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
module.exports.Config = Config;
module.exports.Repository = Repository;
module.exports.WorkingCopyRepository = WorkingCopyRepository;
module.exports.File = File;
module.exports.CloudFile = CloudFile;
module.exports.ConfigFile = ConfigFile;
module.exports.SecretsFile = SecretsFile;
module.exports.RepoFile = RepoFile;
module.exports.SourceRepoFile = SourceRepoFile;
module.exports.DistRepoFile = DistRepoFile;
module.exports.ScriptableFile = ScriptableFile;
module.exports.ScriptableConfigFile = ScriptableConfigFile;
module.exports.ScriptableSourceRepoFile = ScriptableRepoFile;
module.exports.ShortcutsConfigFile = ShortcutsConfigFile;
module.exports.ShortcutsDataFile = ShortcutsDataFile;

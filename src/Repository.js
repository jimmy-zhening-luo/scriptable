// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-brown; icon-glyph: magic;
class Repository {
  #client = String();
  #remote = String();
  #branch = String();
  #sourceDir = String();
  #clone = undefined;
  constructor(
    remote = String(),
    branch = String(),
    sourceDir = String(),
    clone = undefined
  ) {
    const File = importModule("File");
    const config = new File
      .ScriptableConfigFile(
        "repo.json"
      );
    this.#client = config
      ?.setting
      ?.global
      ?.clients
      ?.workingCopy
      ?? new Object();
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
    this.#clone = clone instanceof File?
      clone
      :null;
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
      ?.actions
      ?[action ?? String()]
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
        "?"
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

module.exports = Reppsitory;
module.exports.Repository = Repository;
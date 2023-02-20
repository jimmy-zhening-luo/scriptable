const BOOT_CONFIG_BOOKMARK_NAME: string = "@_BOOT_CONFIG";

class Installer {

  private _config: BootProto;

  constructor() {
    this._config = this.readConfig();
  }

  private clean(): void {
    const FM: FileManager = this.FM;
    const specialPrefix: string = this.specialPrefix;
    const runtimeRootPath: string = this.runtimeRootPath;
    FM
      .listContents(this.runtimeRootPath)
      .filter(child =>
        this.doProcess(
          specialPrefix,
          child
        )
      ).forEach(child => {
        console.log("Boot: Installer: Cleaning: " + child);
        FM.remove(
          FM.joinPath(
            runtimeRootPath,
            child
          )
        );
      });
  }

  install(
    subpath: string = ""
  ): void {
    this.clean();
    const FM: FileManager = this.FM;
    const specialPrefix: string = this.specialPrefix;
    const builtSubpath: string = FM.joinPath(
      this.builtPath,
      subpath
    );
    const runtimeRootPath: string = this.runtimeRootPath;
    FM
      .listContents(builtSubpath)
      .filter(child =>
        this.doProcess(
          specialPrefix,
          child
        )
      ).forEach(child => {
        const builtChild: string = FM.joinPath(
          builtSubpath,
          child
        );
        console.log("Boot: Installer: Installing from: " + builtChild);
        const runtimeChild: string = FM.joinPath(
          runtimeRootPath,
          child
        );
        console.log("Boot: Installer: Installing to: " + runtimeChild);
        FM.copy(
          builtChild,
          runtimeChild
        );
      });
  }

  private readConfig(): BootProto {
    const FM: FileManager = this.FM;
    try {
      if (BOOT_CONFIG_BOOKMARK_NAME === "")
        throw new ReferenceError("Boot.ts: BOOT_CONFIG_BOOKMARK_NAME is empty.");

    } catch (e) {
      console.error("Boot.ts: Exception when getting value of user-defined boot config bookmark: " + e);
      throw e;
    }

    try {
      if (!FM.bookmarkExists(BOOT_CONFIG_BOOKMARK_NAME))
        throw new ReferenceError(`Boot.ts: BOOT_CONFIG_BOOKMARK_NAME (value: ${BOOT_CONFIG_BOOKMARK_NAME}) does not exist in Scriptable.`);
    } catch (e) {
      console.error("Boot.ts: Exception when using Scriptable FileManager to check for existence of boot config bookmark: " + e);
      throw e;
    }

    try {
      if (FM.bookmarkedPath(BOOT_CONFIG_BOOKMARK_NAME) === "")
        throw new ReferenceError(`Boot.ts: BOOT_CONFIG_BOOKMARK_NAME (value: ${BOOT_CONFIG_BOOKMARK_NAME}) maps to an empty path in Scriptable.`);
    }
    catch (e) {
      console.error("Boot.ts: Exception when using Scriptable FileManager to retrieve bookmarked boot config path: " + e);
      throw e;
    }

    try {
      const configFilepath: string = FM.bookmarkedPath(BOOT_CONFIG_BOOKMARK_NAME);
      if (!FM.fileExists(FM.bookmarkedPath(BOOT_CONFIG_BOOKMARK_NAME)))
        throw new ReferenceError(`Boot.ts: BOOT_CONFIG_BOOKMARK_NAME "${BOOT_CONFIG_BOOKMARK_NAME}" resolves to PATH: "${configFilepath}", which does not exist. The path must be a JSON file containing a valid BootProto.`);
    } catch (e) {
      console.error("Boot.ts: Exception when checking for existence of boot config file: " + e);
      throw e;
    }

    try {
      const configFilepath: string = FM.bookmarkedPath(BOOT_CONFIG_BOOKMARK_NAME);
      const config: BootProto = JSON.parse(
        FM.readString(configFilepath)
      );
      if (config === null)
        throw new ReferenceError(`Boot.ts: File at PATH: "${configFilepath}", could not be parsed as JSON.`);
      return config;
    } catch (e) {
      console.error("Boot.ts: Exception when parsing boot config file: " + e);
      throw e;
    }
  }

  get runtimeRootBookmarkName(): string {
    try {
      const runtimeRootBookmarkName: string = this._config.boot.fileBookmarks.runtime;
      if (runtimeRootBookmarkName === "")
        throw new SyntaxError("Boot.ts: Invalid Config. In config file, boot.fileBookmarks.runtime is empty.");
      return runtimeRootBookmarkName;
    } catch (e) {
      console.error("Boot.ts: Exception when getting value of user-defined runtime root bookmark: " + e);
      throw e;
    }
  }

  private get builtBookmarkName(): string {
    try {
      const builtBookmarkName: string = this._config.boot.fileBookmarks.built;
      if (builtBookmarkName === "")
        throw new SyntaxError("Boot.ts: Invalid Config. In config file, boot.fileBookmarks.built is empty.");
      return builtBookmarkName;
    } catch (e) {
      console.error("Boot.ts: Exception when getting value of user-defined built bookmark: " + e);
      throw e;
    }
  }

  private get specialPrefix(): string {
    try {
      const specialPrefix: string = this._config.boot.specialPrefix;
      if (specialPrefix === "")
        throw new SyntaxError("Boot.ts: Invalid Config. In config file, boot.specialPrefix is empty. As a result, all files will be deleted from your runtime directory, including !Boot and !bootrunner.js.");
      return specialPrefix;
    } catch (e) {
      console.error("Boot.ts: Exception when getting value of user-defined special prefix: " + e);
      throw e;
    }
  }

  get runtimeRootPath(): string {
    try {
      if (!this.FM.bookmarkExists(this.runtimeRootBookmarkName))
        throw new ReferenceError(`Boot.ts: runtimeRootBookmarkName "${this.runtimeRootBookmarkName}" does not exist in Scriptable.`);
    } catch (e) {
      console.error("Boot.ts: Exception when using Scriptable FileManager to check for existence of runtime root bookmark: " + e);
      throw e;
    }

    try {
      if (this.FM.bookmarkedPath(this.runtimeRootBookmarkName) === "")
        throw new ReferenceError(`Boot.ts: runtimeRootBookmarkName "${this.runtimeRootBookmarkName}" maps to an empty path in Scriptable.`);
    } catch (e) {
      console.error("Boot.ts: Exception when using Scriptable FileManager to retrieve bookmarked runtime root path: " + e);
      throw e;
    }

    try {
      const runtimeRootPath: string = this.FM.bookmarkedPath(this.runtimeRootBookmarkName);
      if (!this.FM.isDirectory(runtimeRootPath))
        throw new ReferenceError(`Boot.ts: runtimeRootBookmarkName "${this.runtimeRootBookmarkName}" resolves to PATH: "${runtimeRootPath}", which is not a directory.`);
      return runtimeRootPath;
    } catch (e) {
      console.error("Boot.ts: Exception when checking for existence of runtime root directory: " + e);
      throw e;
    }
  }

  private get builtPath(): string {
    try {
      if (!this.FM.bookmarkExists(this.builtBookmarkName))
        throw new ReferenceError(`Boot.ts: builtBookmarkName "${this.builtBookmarkName}" does not exist in Scriptable.`);
    } catch (e) {
      console.error("Boot.ts: Exception when using Scriptable FileManager to check for existence of built bookmark: " + e);
      throw e;
    }

    try {
      if (this.FM.bookmarkedPath(this.builtBookmarkName) === "")
        throw new ReferenceError(`Boot.ts: builtBookmarkName "${this.builtBookmarkName}" maps to an empty path in Scriptable.`);
    } catch (e) {
      console.error("Boot.ts: Exception when using Scriptable FileManager to retrieve bookmarked built path: " + e);
      throw e;
    }

    try {
      const builtPath: string = this.FM.bookmarkedPath(this.builtBookmarkName);
      if (!this.FM.isDirectory(builtPath))
        throw new ReferenceError(`Boot.ts: builtBookmarkName "${this.builtBookmarkName}" resolves to PATH: "${builtPath}", which is not a directory.`);
      return builtPath;
    } catch (e) {
      console.error("Boot.ts: Exception when checking for existence of built directory: " + e);
      throw e;
    }
  }

  private doProcess(
    specialPrefix: string,
    filename: string
  ): boolean {
    if (filename.startsWith(specialPrefix)) {
      console.log("Boot: Installer: Skipping clean and install of: " + filename);
      return false;
    }
    else
      return true;
  }

  private get FM(): FileManager {
    return FileManager.iCloud()
  }
}

module.exports = Installer;

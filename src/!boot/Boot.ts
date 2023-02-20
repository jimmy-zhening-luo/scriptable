const BOOT_CONFIG_BOOKMARK_NAME: string = "@_BOOT_CONFIG";

class Installer {

  private static clean(): void {
    const FM: FileManager = this.FM;
    const specialPrefix: string = Installer.specialPrefix;
    const runtimeRootPath: string = this.runtimeRootPath;
    FM
      .listContents(this.runtimeRootPath)
      .filter(child =>
        Installer.doProcess(
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

  static install(
    subpath: string = ""
  ): void {
    this.clean();
    const FM: FileManager = this.FM;
    const specialPrefix: string = Installer.specialPrefix;
    const builtSubpath: string = FM.joinPath(
      this.builtPath,
      subpath
    );
    const runtimeRootPath: string = this.runtimeRootPath;
    FM
      .listContents(builtSubpath)
      .filter(child =>
        Installer.doProcess(
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

  private static readConfig(): BootProto {
    const FM: FileManager = this.FM;
    console.warn("Boot.ts: See User Configured Bookmark: CONST BOOT_CONFIG_BOOKMARK_NAME: " + BOOT_CONFIG_BOOKMARK_NAME);
    const configFilepath: string = FM.bookmarkedPath(BOOT_CONFIG_BOOKMARK_NAME);
    console.warn("Boot.ts: See resolved path of " + BOOT_CONFIG_BOOKMARK_NAME + ": " + configFilepath);
    const config: BootProto = JSON.parse(
      FM.readString(configFilepath)
    );
    return config;
  }

  static get runtimeRootBookmarkName(): string {
    return this.readConfig().boot.fileBookmarks.runtime;
  }

  private static get builtBookmarkName(): string {
    return this.readConfig().boot.fileBookmarks.built;
  }

  private static get repoSourceBookmarkName(): string {
    return this.readConfig().boot.fileBookmarks.repo;
  }

  private static get specialPrefix(): string {
    return this.readConfig().boot.specialPrefix;
  }

  static get runtimeRootPath(): string {
    return this.FM.bookmarkedPath(this.runtimeRootBookmarkName);
  }

  private static get builtPath(): string {
    return this.FM.bookmarkedPath(this.builtBookmarkName);
  }

  private static get repoSourcePath(): string {
    return this.FM.bookmarkedPath(this.repoSourceBookmarkName);
  }

  private static doProcess(
    specialPrefix: string,
    filename: string
  ): boolean {
    if (filename.startsWith(specialPrefix)) {
      console.log("Boot: Installer: Skipping: " + filename);
      return false;
    }
    else
      return true;
  }

  private static get FM(): FileManager {
    return FileManager.iCloud()
  }
}

module.exports = Installer;

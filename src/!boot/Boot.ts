const BOOT_CONFIG_BOOKMARK_NAME: string = "@_BOOT_CONFIG";

class Installer {

  private static clean(): void {
    const FM: FileManager = this.FM;
    FM
      .listContents(this.runtimeRootPath)
      .filter(child =>
        Installer.doProcess(
          "clean",
          child
        )
      ).forEach(child => {
        FM.remove(
          FM.joinPath(
            this.runtimeRootPath,
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
    const builtSubpath: string = FM.joinPath(
      this.builtPath,
      subpath
    );
    FM
      .listContents(builtSubpath)
      .filter(child =>
        Installer.doProcess(
          "install",
          child
        )
      ).forEach(child => {
        const repoChild: string = FM.joinPath(
          builtSubpath,
          child
        );
        const runtimeChild: string = FM.joinPath(
          this.runtimeRootPath,
          child
        );
        FM.copy(
          repoChild,
          runtimeChild
        );
      });
  }

  private static readConfig(): BootProto {
    const FM: FileManager = this.FM;
    const configFilepath: string = FM.bookmarkedPath(BOOT_CONFIG_BOOKMARK_NAME);
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

  static get runtimeRootPath(): string {
    return this.FM.bookmarkedPath(this.runtimeRootBookmarkName);
  }

  private static get builtPath(): string {
    return this.FM.bookmarkedPath(this.builtBookmarkName);
  }

  private static get repoSourcePath(): string {
    return this.FM.bookmarkedPath(this.repoSourceBookmarkName);
  }

  private static hydrateBootPhaseSettings(
    phase: keyof ScriptableBootPhaseRecords
  ): BootPhaseSettings {
    return this
      .readConfig()
      .boot
      .phases[phase];
  }

  private static doProcess(phase: keyof ScriptableBootPhaseRecords, filename: string): boolean {

    const fileCriteria: BootFileCriteria = this
      .hydrateBootPhaseSettings(phase)
      .files;
    const inclusionCriteria: null | BootFilenameMatchCriteria = fileCriteria?.include ?? null;
    const exclusionCriteria: null | BootFilenameMatchCriteria = fileCriteria?.exclude ?? null;

    const useAllowList: boolean =
      inclusionCriteria !== null
      && (
        fileCriteria.include?.prefix !== undefined
        && fileCriteria.include.prefix.length > 0
        || fileCriteria.include?.suffix !== undefined
        && fileCriteria.include.suffix.length > 0
        || fileCriteria.include?.directories === true
      );

    const defaultDecision: boolean = useAllowList ?
      false
      : true;
    let doProcess: boolean = defaultDecision;

    if (inclusionCriteria !== null) {
      if (inclusionCriteria.directories === true) {
        if (this.FM.isDirectory(filename)) {
          doProcess = true;
        }
      }
      if (inclusionCriteria.prefix !== undefined) {
        if (inclusionCriteria.prefix.length > 0) {
          if (inclusionCriteria.prefix.some(prefix => filename.startsWith(prefix))) {
            doProcess = true;
          }
        }
      }
      if (inclusionCriteria.suffix !== undefined) {
        if (inclusionCriteria.suffix.length > 0) {
          if (inclusionCriteria.suffix.some(suffix => filename.endsWith(suffix))) {
            doProcess = true;
          }
        }
      }
    }

    if (exclusionCriteria !== null) {
      if (exclusionCriteria.directories === true) {
        if (this.FM.isDirectory(filename)) {
          doProcess = false;
        }
      }
      if (exclusionCriteria.prefix !== undefined) {
        if (exclusionCriteria.prefix.length > 0) {
          if (exclusionCriteria.prefix.some(prefix => filename.startsWith(prefix))) {
            doProcess = false;
          }
        }
      }
      if (exclusionCriteria.suffix !== undefined) {
        if (exclusionCriteria.suffix.length > 0) {
          if (exclusionCriteria.suffix.some(suffix => filename.endsWith(suffix))) {
            doProcess = false;
          }
        }
      }
    }
    return doProcess;
  }

  private static get FM(): FileManager {
    return FileManager.iCloud()
  }
}

module.exports = Installer;

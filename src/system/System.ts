const BOOT_RUNTIME_ROOT_SUBPATH: string = "!boot";
const BOOT_FILENAME: string = "BOOT";

const SYSTEM_CONFIG_FILENAME: string = "system.json";
type SYSTEM_CONFIG_INTERFACE = typeof import("./system.json");

class _System {
  private static get BOOT() {
    return importModule(
      [
        ".",
        BOOT_RUNTIME_ROOT_SUBPATH,
        BOOT_FILENAME
      ]
      .join("/")
    );
  }

  static get Bookmark() {
    return _System.File.Bookmark;
  }

  static get File() {
    return importModule("file/File");
  }

  static get ReadOnlyFile() {
    return _System.File.ReadOnlyFile;
  }

  static get Secret() {
    return importModule("secret/Secret");
  }

  private static get CONFIG(): SYSTEM_CONFIG_INTERFACE {
    return JSON.parse(
      new _System.ReadOnlyFile(
        _System.systemRuntimeDir,
        SYSTEM_CONFIG_FILENAME
      )
        .data
    ) as SYSTEM_CONFIG_INTERFACE;
  }

  static get runtimeRootDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        _System.BOOT.RUNTIME_ROOT_BOOKMARK
      )
    );
  }

  private static get BOOT_RUNTIME(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRootDir,
      BOOT_RUNTIME_ROOT_SUBPATH
    );
  }

  static get systemRuntimeDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRootDir,
      _System.BOOT.SYSTEM_RUNTIME_ROOT_SUBPATH
    );
  }

  static get configRuntimeDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRootDir,
      _System.CONFIG
        .system
        .runtime
        .directories
        .rootSubpaths
        .config
    );
  }

  static get libRuntimeDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRootDir,
      _System.CONFIG
        .system
        .runtime
        .directories
        .rootSubpaths
        .lib
    );
  }

  static get storageRuntimeDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRootDir,
      _System.CONFIG
        .system
        .runtime
        .directories
        .rootSubpaths
        .storage
    );
  }

  static get programsRuntimeDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRootDir,
      _System.CONFIG
        .system
        .runtime
        .directories
        .rootSubpaths
        .programs
    );
  }

  static get configSourceRepoDir(): typeof _System.ReadOnlyFile {
    const sourceRepo: _System.Address = _System.CONFIG
      .system
      .sourceRepo
      .directories
      .addresses
      .config as _System.Address;
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        sourceRepo.bookmark as (string | undefined) ?? String()
      ),
      sourceRepo.subpath as (string | undefined) ?? String()
    );
  }


  static get libSourceRepoDir(): typeof _System.ReadOnlyFile {
    const sourceRepo: _System.Address = _System.CONFIG
      .system
      .sourceRepo
      .directories
      .addresses
      .lib as _System.Address;
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        sourceRepo.bookmark as (string | undefined) ?? String()
      ),
      sourceRepo.subpath as (string | undefined) ?? String()
    );
  }

  static get programsSourceRepoDir(): typeof _System.ReadOnlyFile {
    const sourceRepo: _System.Address = _System.CONFIG
      .system
      .sourceRepo
      .directories
      .addresses
      .programs as _System.Address;
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        sourceRepo.bookmark as (string|undefined) ?? String()
      ),
      sourceRepo.subpath as (string|undefined) ?? String()
      );
  }

  private static get protectedFilePrefixes(): Array<string> {
    return _System.CONFIG
      .system
      .runtime
      .protected
      .filePrefixes;
  }

  private static cleanDependencies(): void {
    _System.cleanConfigs();
    _System.cleanLibraries();
  }

  static install(): void {
    _System.cleanDependencies();
    _System.installConfigs();
    _System.installLibraries();
    _System.installPrograms();
  }

  private static cleanConfigs(): void {
    const fm: FileManager = FileManager.iCloud();

    const here: string = _System.configRuntimeDir.path;
    const destination: string = here;

    if (fm.isDirectory(destination))
      fm.remove(destination);
  }

  private static installConfigs(): void {
    _System.cleanConfigs();
    const fm: FileManager = FileManager.iCloud();

    const here: string = _System.configRuntimeDir.path;
    const destination: string = here;

    const there: string = _System.configSourceRepoDir.path;
    const sourceRepo: string = there;

    fm.copy(sourceRepo, destination);
  }

  private static cleanLibraries(): void {
    const fm: FileManager = FileManager.iCloud();

    const here: string = _System.libRuntimeDir.path;
    const destination: string = here;

    if (fm.isDirectory(destination))
      fm.remove(destination);
  }

  private static installLibraries(): void {
    _System.cleanLibraries();
    const fm: FileManager = FileManager.iCloud();

    const here: string = _System.libRuntimeDir.path;
    const destination: string = here;

    const there: string = _System.libSourceRepoDir.path;
    const sourceRepo: string = there;

    fm.copy(sourceRepo, destination);
  }

  private static installPrograms(): void {
    const confirm: Alert = new Alert();
    confirm.message = "Initializing scripts will delete all scripts currently shown. Are you sure you want to override current runtime files?";
    confirm.addDestructiveAction("Yes, DELETE runtime");
    confirm.addCancelAction("No, cancel");
    confirm.present().then((value: number) => (pull(value)));

    function pull(
      value: number = -1
    ): void {
      if (value === 0) {
        const fm: FileManager = FileManager.iCloud();
        const here: string = _System.programsRuntimeDir.path;
        const destination: string = here;

        const there: string = _System.programsSourceRepoDir.path;
        const sourceRepo: string = there;

        const dScripts: string[] = fm
          .listContents(
            destination
          ).filter((leaf: string) => (
            !(_System
              .protectedFilePrefixes
              .some(
                (prefix: string) => (
                  leaf.startsWith(prefix)
                )
              )
            )
            && !(leaf === _System.libRuntimeDir.leaf)
            && !(leaf === _System.BOOT_RUNTIME.leaf)
            && !(leaf === _System.storageRuntimeDir.leaf)
            && !(leaf === _System.configRuntimeDir.leaf)
            && !(leaf === _System.systemRuntimeDir.leaf)
            && !(leaf === ".Trash")
          ));

        for (const leaf of dScripts) {
          const dFile: string = fm.joinPath(
            destination,
            leaf
          );
          console.log(dFile);
          fm.remove(dFile);
        }

        const sScripts: string[] = fm
          .listContents(
            sourceRepo
          );

        for (const leaf of sScripts) {
          const sFile: string = fm.joinPath(
            sourceRepo,
            leaf
          );
          const dFile: string = fm.joinPath(
            destination,
            leaf
          );
          console.log([sFile, dFile]);
          fm.copy(sFile, dFile);
        }
      }
    }
  }
}

namespace _System {
  export type Address = {
    readonly bookmark?: string | undefined;
    readonly subpath?: string | undefined;
  }
}

module.exports = _System;

const BOOT_RUNTIME_ROOT_SUBPATH: string = "!boot";
const BOOT_FILENAME: string = "BOOT";

const SYSTEM_CONFIG_FILENAME: string = "system.json";
type _SYSTEM_CONFIG = typeof import("./system.json");

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
    return importModule("Secret");
  }

  static get CONFIG(): _SYSTEM_CONFIG {
    return JSON.parse(
      new _System.ReadOnlyFile(
        _System.systemRuntime,
        SYSTEM_CONFIG_FILENAME
      )
        .data
    ) as _SYSTEM_CONFIG;
  }

  static get runtimeRoot(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        _System.BOOT.RUNTIME_ROOT_BOOKMARK
      )
    );
  }

  static get BOOT_RUNTIME(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRoot,
      BOOT_RUNTIME_ROOT_SUBPATH
    );
  }

  static get systemRuntime(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRoot,
      _System.BOOT.SYSTEM_RUNTIME_ROOT_SUBPATH
    );
  }

  static get configRuntime(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRoot,
      _System.CONFIG
        .system
        .runtime
        .directories
        .rootSubpaths
        .config
    );
  }

  static get libRuntime(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRoot,
      _System.CONFIG
        .system
        .runtime
        .directories
        .rootSubpaths
        .lib
    );
  }

  static get storageRuntime(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRoot,
      _System.CONFIG
        .system
        .runtime
        .directories
        .rootSubpaths
        .storage
    );
  }

  static get programRuntime(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.runtimeRoot,
      _System.CONFIG
        .system
        .runtime
        .directories
        .rootSubpaths
        .program
    );
  }

  static get configSource(): typeof _System.ReadOnlyFile {
    const source: _System._Address = _System.CONFIG
      .system
      .source
      .addresses
      .config as _System._Address;
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        source.bookmark as (string | undefined) ?? String()
      ),
      source.subpath as (string | undefined) ?? String()
    );
  }


  static get libSource(): typeof _System.ReadOnlyFile {
    const source: _System._Address = _System.CONFIG
      .system
      .source
      .addresses
      .lib as _System._Address;
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        source.bookmark as (string | undefined) ?? String()
      ),
      source.subpath as (string | undefined) ?? String()
    );
  }

  static get programSource(): typeof _System.ReadOnlyFile {
    const source: _System._Address = _System.CONFIG
      .system
      .source
      .addresses
      .program as _System._Address;
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        source.bookmark as (string|undefined) ?? String()
      ),
      source.subpath as (string|undefined) ?? String()
      );
  }

  static get protectedFilePrefix(): string {
    return String(
      _System.CONFIG
        .system
        .runtime
        .protected
        .filePrefix
    );
  }

  static cleanDependencies(): void {
    _System.cleanConfigs();
    _System.cleanLibraries();
  }

  static install(): void {
    _System.cleanDependencies();
    _System.installConfigs();
    _System.installLibraries();
    _System.installPrograms();
  }

  static cleanConfigs(): void {
    const fm: FileManager = FileManager.iCloud();

    const here: string = _System.configRuntime.path;
    const destination: string = here;

    if (fm.isDirectory(destination))
      fm.remove(destination);
  }

  static installConfigs(): void {
    _System.cleanConfigs();
    const fm: FileManager = FileManager.iCloud();

    const here: string = _System.configRuntime.path;
    const destination: string = here;

    const there: string = _System.configSource.path;
    const source: string = there;

    fm.copy(source, destination);
  }

  static cleanLibraries(): void {
    const fm: FileManager = FileManager.iCloud();

    const here: string = _System.libRuntime.path;
    const destination: string = here;

    if (fm.isDirectory(destination))
      fm.remove(destination);
  }

  static installLibraries(): void {
    _System.cleanLibraries();
    const fm: FileManager = FileManager.iCloud();

    const here: string = _System.libRuntime.path;
    const destination: string = here;

    const there: string = _System.libSource.path;
    const source: string = there;

    fm.copy(source, destination);
  }

  static installPrograms(): void {
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
        const here: string = _System.programRuntime.path;
        const destination: string = here;

        const there: string = _System.programSource.path;
        const source: string = there;

        const dScripts: string[] = fm
          .listContents(
            destination
          ).filter((leaf: string) => (
            !leaf.startsWith(_System.protectedFilePrefix)
            && !(leaf === _System.libRuntime.leaf)
            && !(leaf === _System.BOOT_RUNTIME.leaf)
            && !(leaf === _System.storageRuntime.leaf)
            && !(leaf === _System.configRuntime.leaf)
            && !(leaf === _System.systemRuntime.leaf)
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
            source
          );

        for (const leaf of sScripts) {
          const sFile: string = fm.joinPath(
            source,
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
  export type _Address = {
    readonly bookmark?: string | undefined;
    readonly subpath?: string | undefined;
  }
}

module.exports = _System;

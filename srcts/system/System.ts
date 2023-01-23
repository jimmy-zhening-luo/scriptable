const BOOT_DIR: string = "!boot";
const BOOT_MODULE: string = [
  ".",
  BOOT_DIR,
  "Boot"
].join("/");

type _SystemConfig = typeof import("./system.json");

type _DirAddress = {
  readonly bookmark?: string | undefined;
  readonly subpath?: string | undefined;
}

class _System {
  static get Boot() {
    return importModule(BOOT_MODULE);
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

  static get config(): _SystemConfig {
    return JSON.parse(
      new _System.ReadOnlyFile(
        _System.systemDir,
        _System.Boot.SYSTEM_CONFIG_FILE
      )
      .data
    ) as _SystemConfig;
  }

  static get root(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        _System.Boot.ROOT_BOOKMARK
      )
    );
  }

  static get bootDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.root,
      BOOT_DIR
    );
  }

  static get systemDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.root,
      _System.Boot.SYSTEM_DIR
    );
  }

  static get configDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.root,
      _System.config.system
        ["prod"]
        ["dirs"]
        ["config"]
    );
  }

  static get configSource(): typeof _System.ReadOnlyFile {
    const source: _DirAddress = _System.config.system
      .source
      .config
      .dir as _DirAddress;
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        source.bookmark as (string|undefined) ?? String()
      ),
      source.subpath as (string|undefined) ?? String()
    );
  }

  static get libDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.root,
      _System.config.system
        .prod
        .dirs
        .lib
    );
  }

  static get libSource(): typeof _System.ReadOnlyFile {
    const source: _DirAddress = _System.config.system
      .source
      .lib
      .dir as _DirAddress;
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        source.bookmark as (string|undefined) ?? String()
      ),
      source.subpath as (string|undefined) ?? String()
      );
  }

  static get dataDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.root,
      _System.config.system
        .prod
        .dirs
        .data
    );
  }

  static get programDir(): typeof _System.ReadOnlyFile {
    return new _System.ReadOnlyFile(
      _System.root,
      _System.config.system
        .prod
        .dirs
        .program
    );
  }

  static get programSource(): typeof _System.ReadOnlyFile {
    const source: _DirAddress = _System.config.system
      .source
      .program
      .dir as _DirAddress;
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        source.bookmark as (string|undefined) ?? String()
      ),
      source.subpath as (string|undefined) ?? String()
      );
  }

  static get protectedFilePrefix(): string {
    return String(
      _System.config.system
        .prod
        .protected
        .filePrefix
    );
  }

  static get externalSecretsDir(): typeof _System.ReadOnlyFile {
    const ext: _DirAddress = _System.config.system
      .external
      .secrets
      .dir as _DirAddress;
    return new _System.ReadOnlyFile(
      new _System.Bookmark(
        ext.bookmark as (string|undefined) ?? String()
      ),
      ext.subpath as (string|undefined) ?? String()
    );
  }

  static clean(): void {
    _System.cleanConfigs();
    _System.cleanLibraries();
    _System.cleanPrograms();
  }

  static install(): void {
    _System.clean();
    _System.installConfigs();
    _System.installLibraries();
    _System.installPrograms();
  }

  static cleanConfigs(): void {

  }

  static installConfigs(): void {
    _System.cleanConfigs();
    const fm: FileManager = FileManager.iCloud();

    const here: string = _System.configDir.path;
    const destination: string = here;

    const there: string = _System.configSource.path;
    const source: string = there;

    if (fm.isDirectory(destination))
      fm.remove(destination);

    fm.copy(source, destination);
  }

  static cleanLibraries(): void {

  }

  static installLibraries(): void {
    _System.cleanLibraries();
    const fm: FileManager = FileManager.iCloud();

    const here: string = _System.libDir.path;
    const destination: string = here;

    const there: string = _System.libSource.path;
    const source: string = there;

    if (fm.isDirectory(destination))
      fm.remove(destination);

    fm.copy(source, destination);
  }

  static cleanPrograms(): void {

  }

  static installPrograms(): void {
    _System.cleanPrograms();
    const confirm: Alert = new Alert();
    confirm.message = "Initializing scripts will delete all scripts currently shown. Are you sure you want to override current production files?";
    confirm.addDestructiveAction("Yes, DELETE prod");
    confirm.addCancelAction("No, cancel");
    confirm.present().then((value: number) => (pull(value)));

    function pull(
      value: number = -1
    ): void {
      if (value === 0) {
        const fm: FileManager = FileManager.iCloud();
        const here: string = _System.programDir.path;
        const destination: string = here;

        const there: string = _System.programSource.path;
        const source: string = there;

        const dScripts: string[] = fm
          .listContents(
            destination
          ).filter((leaf: string) => (
            !leaf.startsWith(_System.protectedFilePrefix)
            && !(leaf === _System.libDir.leaf)
            && !(leaf === _System.bootDir.leaf)
            && !(leaf === _System.dataDir.leaf)
            && !(leaf === _System.configDir.leaf)
            && !(leaf === _System.systemDir.leaf)
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

module.exports = _System;
module.exports.System = _System;
module.exports.Bookmark = _System.Bookmark;
module.exports.File = _System.File;
module.exports.ReadOnlyFile = _System.ReadOnlyFile;

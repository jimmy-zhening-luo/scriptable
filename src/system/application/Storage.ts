const STORAGE_DIR_SUBPATH_FROM_ROOT = "!storage";

class Storage {

  readonly file: File;

  constructor(
    storageSubdirectoryPath: string,
    programName: string,
    subpath: string = "default.txt"
  ) {
    this.file = new Storage.File(
      this.storageDirFile,
      Storage.Paths.joinPaths(
        Storage.Paths.joinPaths(
          storageSubdirectoryPath,
          programName
        ),
        subpath
      )
    );
  }

  protected get storageDirFile(): File {
    const _installer: typeof Installer = importModule("./!boot/Boot");
    return new Storage.File(
      new Storage.File.Bookmark(
        _installer.runtimeRootBookmarkName
      ),
      this.storageDirSubpathFromRoot
    );
  }

  protected get storageDirSubpathFromRoot(): string {
    return STORAGE_DIR_SUBPATH_FROM_ROOT;
  }

  get path(): string {
    return this.file.path as string;
  }

  get data(): string {
    return this.file.data as string;
  }

  read(): string {
    return this.data;
  }

  write(
    text: string
  ): void {
    const overwrite: boolean = true;
    this.file.write(
      text,
      overwrite
    );
  }

  toString(): string {
    return this.data;
  }

  get File(): typeof File {
    return Storage.File;
  }

  get Paths(): typeof Paths {
    return Storage.Paths;
  }

  static get File(): typeof File {
    return importModule("files/file/File");
  }

  static get Paths(): typeof Paths {
    return Storage.File.Paths;
  }

}

module.exports = Storage;

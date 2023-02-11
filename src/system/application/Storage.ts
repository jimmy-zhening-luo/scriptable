const STORAGE_DIR_SUBPATH_FROM_ROOT = "!storage";

class Storage {
  readonly file: File;
  constructor(
    storageSubdirectoryPath: string,
    programName: string,
    subpath: string = "default.txt"
  ) {
    const _File: typeof File = importModule("files/file/File");
    this.file = new _File(
      this.storageDirFile,
      _File.joinPaths(
        _File.joinPaths(
          storageSubdirectoryPath,
          programName
        ),
        subpath
      )
    );
  }

  protected get storageDirFile(): File {
    const _File: typeof File = importModule("files/file/File");
    const _Bookmark: typeof Bookmark = importModule("files/file/bookmark/Bookmark");
    const _Installer: typeof Installer = importModule("./!boot/Boot");
    return new _File(new _Bookmark(_Installer.runtimeRootBookmarkName), this.storageDirSubpathFromRoot);
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
}

module.exports = Storage;

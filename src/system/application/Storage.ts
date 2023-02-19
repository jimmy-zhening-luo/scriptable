const STORAGE_BOOKMARK: string = "#Data";

class Storage {

  readonly file: File;

  constructor(
    storageSubpath: string,
    programName: string,
    subpath: string = "default.txt"
  ) {
    this.file = new Storage.File(
      this.storageDirFile,
      Storage.Paths.join(
        Storage.Paths.join(
          storageSubpath,
          programName
        ),
        subpath
      )
    );
  }

  protected get storageDirFile(): File {
    return new Storage.File(
      new Storage.File.Bookmark(
        this.storageBookmark
      )
    );
  }

  protected get storageBookmark(): string {
    return STORAGE_BOOKMARK;
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

  get Paths(): typeof Filepath {
    return Storage.Paths;
  }

  static get File(): typeof File {
    return importModule("files/file/File");
  }

  static get Paths(): typeof Filepath {
    return Storage.File.Paths;
  }

}

module.exports = Storage;

const st_Utility: typeof Utility = importModule("utility/Utility");

class Storage extends st_Utility {

  constructor(
    storageSubpath: string,
    programName: string,
    subpath: string = "default.txt"
  ) {
    super(
      Storage.File,
      Storage._storageDirFile,
      Storage.File.join(
        Storage.File.join(
          storageSubpath,
          programName
        ),
        subpath
      )
    );
  }

  private get _storageDirFile(): File {
    return new Storage.File(
      new Storage.File.Bookmark(
        this._storageBookmarkName
      )
    );
  }

  write(
    text: string
  ): this {
    const overwrite: boolean = true;
    this.file.write(
      text,
      overwrite
    );
    return this;
  }

}

module.exports = Storage;

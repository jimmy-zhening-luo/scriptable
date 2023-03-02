const st_Utility: typeof Utility = importModule("utility/Utility");

class Storage extends st_Utility {
  constructor(
    storageSubpath: string,
    programName: string,
    subpath: string = "default.txt",
  ) {
    super(
      "Storage",
      Storage.File,
      Storage.File.join(
        Storage.File.join(storageSubpath, programName),
        subpath,
      ),
    );
  }

  write(text: string): this {
    const overwrite: boolean = true;
    this._file.write(text, overwrite);
    return this;
  }
}

module.exports = Storage;

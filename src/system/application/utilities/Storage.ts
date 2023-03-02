const st_Utility: typeof Utility = importModule("utility/Utility");

class Storage extends st_Utility {
  constructor(
    storageSubpath: string,
    programName: string,
    subpath: string = "default.txt",
  ) {
    try {
      super(
        "Storage",
        Storage.File,
        Storage.File.join(
          Storage.File.join(storageSubpath, programName),
          subpath,
        ),
      );
    } catch (e) {
      throw new Error(
        `Storage: constructor: Error creating Storage object: ${e}`,
      );
    }
  }

  write(text: string): this {
    try {
      const overwrite: boolean = true;
      this._file.write(text, overwrite);
      return this;
    } catch (e) {
      throw new Error(`Storage: write: Error writing to file: ${e}`);
    }
  }
}

module.exports = Storage;

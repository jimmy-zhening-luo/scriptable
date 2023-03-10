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
      this._file.write(text, true);
      return this;
    } catch (e) {
      throw new Error(`Storage: write: Error writing to file: ${e}`);
    }
  }

  static get Utility(): typeof Utility {
    try {
      return st_Utility;
    } catch (e) {
      throw new ReferenceError(
        `Storage: get Utility: Error importing Utility module: ${e}`,
      );
    }
  }
}

module.exports = Storage;

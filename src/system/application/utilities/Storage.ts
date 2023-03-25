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
        Storage.File.join(storageSubpath, programName, subpath),
        Storage.File,
      );
    } catch (e) {
      throw new EvalError(
        `Storage: constructor: Error creating Storage object: \n${e}`,
      );
    }
  }

  write(text: string): this {
    try {
      this._file.write(text, true);
      return this;
    } catch (e) {
      throw new EvalError(`Storage: write: Error writing to file: \n${e}`);
    }
  }

  static get Utility(): typeof Utility {
    try {
      return st_Utility;
    } catch (e) {
      throw new ReferenceError(
        `Storage: get Utility: Error importing Utility module: \n${e}`,
      );
    }
  }
}

module.exports = Storage;

const stor_Filetype: typeof Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Storage extends stor_Filetype {
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

  delete(): this {
    try {
      this._file.delete();
      return this;
    } catch (e) {
      throw new EvalError(`Storage: delete: Error deleting file: \n${e}`);
    }
  }

  static get Filetype(): typeof Filetype {
    try {
      return stor_Filetype;
    } catch (e) {
      throw new ReferenceError(
        `Storage: get Utility: Error importing Utility module: \n${e}`,
      );
    }
  }
}

module.exports = Storage;

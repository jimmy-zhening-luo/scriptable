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
        Storage.IOFile.join(
          storageSubpath,
          programName,
          subpath,
        ),
        Storage.IOFile,
      );
    }
    catch (e) {
      throw new EvalError(
        `Storage: constructor: Error creating Storage object: \n${e as string}`,
      );
    }
  }

  public static get Filetype(): typeof Filetype {
    try {
      return stor_Filetype;
    }
    catch (e) {
      throw new ReferenceError(
        `Storage: get Utility: Error importing Utility module: \n${e as string}`,
      );
    }
  }

  public write(text: string): this {
    try {
      this._file.write(text, true);

      return this;
    }
    catch (e) {
      throw new EvalError(`Storage: write: Error writing to file: \n${e as string}`);
    }
  }

  public async delete(): Promise<this> {
    try {
      await this._file.delete();

      return this;
    }
    catch (e) {
      throw new EvalError(`Storage: delete: Error deleting file: \n${e as string}`);
    }
  }
}

module.exports = Storage;

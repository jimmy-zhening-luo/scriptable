class Files {
  public static get ReadOnlyIOFile(): typeof ReadOnlyIOFile {
    try {
      return importModule("ReadOnlyIOFile") as typeof ReadOnlyIOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Files: Error importing ReadOnlyIOFile class: \n${e as string}`,
      );
    }
  }

  public static get IOFile(): typeof IOFile {
    try {
      return Files.ReadOnlyIOFile.IOFile;
    }
    catch (e) {
      throw new ReferenceError(`Files: Error importing IOFile class: \n${e as string}`);
    }
  }

  public static get Bookmark(): typeof Bookmark {
    try {
      return Files.IOFile.Bookmark;
    }
    catch (e) {
      throw new ReferenceError(`Files: Error importing Bookmark class: \n${e as string}`);
    }
  }

  public static get FilepathString(): typeof FilepathString {
    try {
      return Files.IOFile.FilepathString;
    }
    catch (e) {
      throw new ReferenceError(
        `Files: Error importing FilepathString class: \n${e as string}`,
      );
    }
  }
}

module.exports = Files;

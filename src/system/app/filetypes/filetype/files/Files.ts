class Files {
  public static get ReadOnlyIOFile(): typeof ReadOnlyIOFile {
    try {
      return importModule("ReadOnlyIOFile") as typeof ReadOnlyIOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Files: import ReadOnlyIOFile: \n${e as string}`,
      );
    }
  }

  public static get IOFile(): typeof IOFile {
    try {
      return Files.ReadOnlyIOFile.IOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `Files: import ReadOnlyIOFile.IOFile: \n${e as string}`,
      );
    }
  }

  public static get Bookmark(): typeof Bookmark {
    try {
      return Files.IOFile.Bookmark;
    }
    catch (e) {
      throw new ReferenceError(
        `Files: import IOFile.Bookmark: \n${e as string}`,
      );
    }
  }
}

module.exports = Files;

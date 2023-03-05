class Files {
  static get ReadOnlyFile(): typeof ReadOnlyFile {
    try {
      return importModule("ReadOnlyFile");
    } catch (e) {
      throw new ReferenceError(
        `Files: Error importing ReadOnlyFile class: ${e}`,
      );
    }
  }

  static get File(): typeof File {
    try {
      return Files.ReadOnlyFile.File;
    } catch (e) {
      throw new ReferenceError(`Files: Error importing File class: ${e}`);
    }
  }

  static get Bookmark(): typeof Bookmark {
    try {
      return Files.File.Bookmark;
    } catch (e) {
      throw new ReferenceError(`Files: Error importing Bookmark class: ${e}`);
    }
  }

  static get FilepathString(): typeof FilepathString {
    try {
      return Files.File.FilepathString;
    } catch (e) {
      throw new ReferenceError(
        `Files: Error importing FilepathString class: ${e}`,
      );
    }
  }
}

module.exports = Files;

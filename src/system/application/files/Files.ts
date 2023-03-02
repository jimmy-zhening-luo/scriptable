class Files {
  static get ReadOnlyFile(): typeof ReadOnlyFile {
    try {
      return importModule("ReadOnlyFile");
    } catch (e) {
      console.error(`Files: Error importing ReadOnlyFile class: ${e}`);
      throw e;
    }
  }

  static get File(): typeof File {
    return Files.ReadOnlyFile.File;
  }

  static get Bookmark(): typeof Bookmark {
    return Files.File.Bookmark;
  }
}

module.exports = Files;

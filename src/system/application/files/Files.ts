class Files {

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    return importModule("ReadOnlyFile");
  }

  static get File(): typeof File {
    return Files.ReadOnlyFile.File;
  }

  static get Bookmark(): typeof Bookmark {
    return Files.File.Bookmark;
  }

}

module.exports = Files;

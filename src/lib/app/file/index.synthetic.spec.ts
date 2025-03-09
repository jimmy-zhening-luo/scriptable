const SyntheticFileManager = class SyntheticFileManager {
  public static local() {
    return new SyntheticFileManager();
  }

  public static iCloud() {
    return new SyntheticFileManager();
  }

  public readString(filePath: string) {
    const string = "SYNTHETIC_FILEMANAGER_FILE_READ_DATA";

    console.log(`Read content "${string}" from path: ${filePath}`);

    return string;
  }

  public writeString(filePath: string, content: string) {
    console.log(`Wrote content "${content}" to path: ${filePath}`);
  }

  public remove(filePath: string) {
    console.log(`Removed file at path: ${filePath}`);
  }

  public fileExists(path: string) {
    console.log(`Assert file exists at path: ${path}`);

    return true;
  }

  public isDirectory(path: string) {
    console.log(`Assert file is not directory at path: ${path}`);

    return false;
  }

  public createDirectory(path: string, intermediateDirectories = false) {
    console.log(`Created directory at path (intermediate=${intermediateDirectories}): ${path}`);
  }

  public bookmarkedPath(bookmark: string) {
    const SYNTHETIC_BOOKMARKED_PATH = "SYNTHETIC_FILEMANAGER:SYNTHETIC_FILE_ROOT/SYNTHETIC_FILETYPE";

    console.log(`Resolve bookmark "${bookmark}" to path: ${SYNTHETIC_BOOKMARKED_PATH}`);

    return SYNTHETIC_BOOKMARKED_PATH;
  }

  public bookmarkExists(bookmark: string) {
    console.log(`Assert bookmark exists: ${bookmark}`);

    return true;
  }
} as typeof FileManager;

export { SyntheticFileManager };

const SyntheticFileManager = class SyntheticFileManager {
  public static local() {
    return new SyntheticFileManager();
  }

  public static iCloud() {
    return new SyntheticFileManager();
  }

  public readString(filePath: string) {
    const SYNTHETIC_FILE_CONTENT = "SYNTHETIC_FILEMANAGER_FILE_READ_DATA";

    console.log(`Read content "${SYNTHETIC_FILE_CONTENT}" from '${filePath}'`);

    return SYNTHETIC_FILE_CONTENT;
  }

  public writeString(filePath: string, content: string) {
    console.log(`Write content "${content}" to '${filePath}`);
  }

  public remove(filePath: string) {
    console.log(`Delete file at '${filePath}'`);
  }

  public fileExists(path: string) {
    console.log(`Assert file at '${path}'`);

    return true;
  }

  public isDirectory(path: string) {
    console.log(`Assert directory at '${path}'`);

    return false;
  }

  public createDirectory(path: string, intermediateDirectories = false) {
    console.log(`Create directory at path '${path}' (intermediateDirectories==${intermediateDirectories})`);
  }

  public bookmarkedPath(bookmark: string) {
    const SYNTHETIC_BOOKMARKED_PATH = "SYNTHETIC_FILEMANAGER:SYNTHETIC_FILE_ROOT/SYNTHETIC_FILETYPE";

    console.log(`Mocha: Synthetic File: resolve bookmark '${bookmark}' as '${SYNTHETIC_BOOKMARKED_PATH}'`);

    return SYNTHETIC_BOOKMARKED_PATH;
  }

  public bookmarkExists(bookmark: string) {
    console.log(`Mocha: Synthetic File: assert bookmark '${bookmark}'`);

    return true;
  }
} as typeof FileManager;

export { SyntheticFileManager };

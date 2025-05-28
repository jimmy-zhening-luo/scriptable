const MockFileManager = class FileManager {
  public static local() {
    return new FileManager();
  }

  public static iCloud() {
    return new FileManager();
  }

  public readString(
    filePath: string,
  ) {
    const MOCK_FILE_CONTENT = "MOCK_FILEMANAGER_FILE_READ_DATA";

    console.log(`Mocha: File Instance: Read content "${MOCK_FILE_CONTENT}" from '${filePath}'`);

    return MOCK_FILE_CONTENT;
  }

  public writeString(
    filePath: string,
    content: string,
  ) {
    console.log(`Mocha: File Instance: Wrote content "${content}" to '${filePath}`);
  }

  public remove(
    filePath: string,
  ) {
    console.log(`Mocha: File Instance: Deleted file at '${filePath}'`);
  }

  public fileExists(
    path: string,
  ) {
    console.log(`Mocha: File Instance: Asserted file exists at '${path}'`);

    return true;
  }

  public isDirectory(
    path: string,
  ) {
    console.log(`Mocha: File Instance: Asserted directory at '${path}'`);

    return false;
  }

  public createDirectory(
    path: string,
    intermediateDirectories = false,
  ) {
    console.log(`Mocha: File Instance: Created directory at path '${path}' (intermediateDirectories==${intermediateDirectories})`);
  }

  public bookmarkedPath(
    bookmark: string,
  ) {
    const MOCK_BOOKMARKED_PATH = "MOCK_FILEMANAGER:MOCK_FILE_ROOT/MOCK_FILETYPE";

    console.log(`Mocha: File Instance: Resolved bookmark '${bookmark}' as '${MOCK_BOOKMARKED_PATH}'`);

    return MOCK_BOOKMARKED_PATH;
  }

  public bookmarkExists(
    bookmark: string,
  ) {
    console.log(`Mocha: File Instance: Asserted bookmark '${bookmark}'`);

    return true;
  }
} as typeof FileManager;

export { MockFileManager };

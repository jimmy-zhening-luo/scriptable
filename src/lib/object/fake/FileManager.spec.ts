const FakeFileManager = class FakeFileManager {
  public static local() {
    return new FakeFileManager();
  }

  public static iCloud() {
    return new FakeFileManager();
  }

  public readString(filePath: string) {
    const string = "FAKE DATA THAT WAS READ FROM FILE";

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
    const FAKE_BOOKMARK_PATH = "root/FAKE/BOOKMARK/PATH";

    console.log(`Resolve bookmark "${bookmark}" to path: ${FAKE_BOOKMARK_PATH}`);

    return FAKE_BOOKMARK_PATH;
  }

  public bookmarkExists(bookmark: string) {
    console.log(`Assert bookmark exists: ${bookmark}`);

    return true;
  }
} as unknown as typeof FileManager;

export { FakeFileManager };

import { Data } from "./data";
import { Image } from "./image";

export class FileManager {
  public static local() {
    return new FileManager();
  }

  public static iCloud() {
    return new FileManager();
  }

  public read(filePath: string) {
    console.log(`Mocha: File Instance: Read data from '${filePath}'`);

    return new Data();
  }

  public readString(filePath: string) {
    const MOCK_FILE_CONTENT = "MOCK_FILEMANAGER_FILE_READ_DATA";

    console.log(`Mocha: File Instance: Read string "${MOCK_FILE_CONTENT}" from '${filePath}'`);

    return MOCK_FILE_CONTENT;
  }

  public readImage(filePath: string) {
    console.log(`Mocha: File Instance: Read image from '${filePath}'`);

    return Image.fromFile(filePath);
  }

  public write(
    filePath: string,
    content: Data,
  ) {
    console.log(`Mocha: File Instance: Wrote data to '${filePath}' with content '${content.toRawString()}'`);
  }

  public writeString(
    filePath: string,
    content: string,
  ) {
    console.log(`Mocha: File Instance: Wrote content "${content}" to '${filePath}`);
  }

  public writeImage(
    filePath: string,
    image: Image,
  ) {
    console.log(`Mocha: File Instance: Wrote image to '${filePath}' with size ${image.size.width}x${image.size.height}`);
  }

  public remove(filePath: string) {
    console.log(`Mocha: File Instance: Deleted file at '${filePath}'`);
  }

  public move(
    sourceFilePath: string,
    destinationFilePath: string,
  ) {
    console.log(`Mocha: File Instance: Moved file from '${sourceFilePath}' to '${destinationFilePath}'`);
  }

  public copy(
    sourceFilePath: string,
    destinationFilePath: string,
  ) {
    console.log(`Mocha: File Instance: Copied file from '${sourceFilePath}' to '${destinationFilePath}'`);
  }

  public fileExists(path: string) {
    console.log(`Mocha: File Instance: Asserted file exists at '${path}'`);

    return true;
  }

  public isDirectory(path: string) {
    console.log(`Mocha: File Instance: Asserted directory at '${path}'`);

    return false;
  }

  public createDirectory(
    path: string,
    intermediateDirectories = false,
  ) {
    console.log(`Mocha: File Instance: Created directory at path '${path}' (intermediateDirectories==${intermediateDirectories})`);
  }

  public temporaryDirectory() {
    const MOCK_TEMPORARY_DIRECTORY = "MOCK_FILEMANAGER:MOCK_TEMPORARY_DIRECTORY";

    console.log(`Mocha: File Instance: Temporary directory is '${MOCK_TEMPORARY_DIRECTORY}'`);

    return MOCK_TEMPORARY_DIRECTORY;
  }

  public cacheDirectory() {
    const MOCK_CACHE_DIRECTORY = "MOCK_FILEMANAGER:MOCK_CACHE_DIRECTORY";

    console.log(`Mocha: File Instance: Cache directory is '${MOCK_CACHE_DIRECTORY}'`);

    return MOCK_CACHE_DIRECTORY;
  }

  public documentsDirectory() {
    const MOCK_DOCUMENTS_DIRECTORY = "MOCK_FILEMANAGER:MOCK_DOCUMENTS_DIRECTORY";

    console.log(`Mocha: File Instance: Documents directory is '${MOCK_DOCUMENTS_DIRECTORY}'`);

    return MOCK_DOCUMENTS_DIRECTORY;
  }

  public libraryDirectory() {
    const MOCK_LIBRARY_DIRECTORY = "MOCK_FILEMANAGER:MOCK_LIBRARY_DIRECTORY";

    console.log(`Mocha: File Instance: Library directory is '${MOCK_LIBRARY_DIRECTORY}'`);

    return MOCK_LIBRARY_DIRECTORY;
  }

  public joinPath(
    lhsPath: string,
    rhsPath: string,
  ) {
    const MOCK_JOINED_PATH = [
      ...lhsPath.split("/"),
      ...rhsPath.split("/"),
    ]
      .filter(segment => segment !== "")
      .join("/");

    console.log(`Mocha: File Instance: Joined path '${lhsPath}' and '${rhsPath}' as '${MOCK_JOINED_PATH}'`);

    return MOCK_JOINED_PATH;
  }

  public allTags(filePath: string) {
    console.log(`Mocha: File Instance: Read all tags from '${filePath}'`);

    return [];
  }

  public addTag(
    filePath: string,
    tag: string,
  ) {
    console.log(`Mocha: File Instance: Added tag '${tag}' to file at '${filePath}'`);
  }

  public removeTag(
    filePath: string,
    tag: string,
  ) {
    console.log(`Mocha: File Instance: Removed tag '${tag}' from file at '${filePath}'`);
  }

  public readExtendedAttribute(
    filePath: string,
    name: string,
  ) {
    const MOCK_EXTENDED_ATTRIBUTE_VALUE = "MOCK_FILEMANAGER_EXTENDED_ATTRIBUTE_VALUE";

    console.log(`Mocha: File Instance: Read extended attribute '${name}' from file at '${filePath}': '${MOCK_EXTENDED_ATTRIBUTE_VALUE}'`);

    return MOCK_EXTENDED_ATTRIBUTE_VALUE;
  }

  public writeExtendedAttribute(
    filePath: string,
    value: string,
    name: string,
  ) {
    console.log(`Mocha: File Instance: Wrote extended attribute '${name}' with value '${value}' to file at '${filePath}'`);
  }

  public removeExtendedAttribute(
    filePath: string,
    name: string,
  ) {
    console.log(`Mocha: File Instance: Removed extended attribute '${name}' from file at '${filePath}'`);
  }

  public allExtendedAttributes(filePath: string) {
    console.log(`Mocha: File Instance: Read all extended attributes from file at '${filePath}'`);

    return [];
  }

  public getUTI(filePath: string) {
    const MOCK_UTI = "public.mock-file-type";

    console.log(`Mocha: File Instance: Read UTI from file at '${filePath}': '${MOCK_UTI}'`);

    return MOCK_UTI;
  }

  public listContents(directoryPath: string) {
    const MOCK_CONTENTS = [
      "file1.txt",
      "file2.txt",
      "directory1",
    ];

    console.log(`Mocha: File Instance: Listed contents of directory '${directoryPath}': ${MOCK_CONTENTS.join(", ")}`);

    return MOCK_CONTENTS;
  }

  public fileName(
    filePath: string,
    includeFileExtension = false,
  ) {
    const MOCK_FILE_NAME = "MOCK_FILE_NAME",
    MOCK_FILE_EXTENSION = includeFileExtension ? ".txt" : "";

    console.log(`Mocha: File Instance: Read file name from '${filePath}': '${MOCK_FILE_NAME}${MOCK_FILE_EXTENSION}'`);

    return `${MOCK_FILE_NAME}${MOCK_FILE_EXTENSION}`;
  }

  public fileExtension(filePath: string) {
    const MOCK_FILE_EXTENSION = ".txt";

    console.log(`Mocha: File Instance: Read file extension from '${filePath}': '${MOCK_FILE_EXTENSION}'`);

    return MOCK_FILE_EXTENSION;
  }

  public bookmarkedPath(bookmark: string) {
    const MOCK_BOOKMARKED_PATH = "MOCK_FILEMANAGER:MOCK_FILE_ROOT/MOCK_FILETYPE";

    console.log(`Mocha: File Instance: Resolved bookmark '${bookmark}' as '${MOCK_BOOKMARKED_PATH}'`);

    return MOCK_BOOKMARKED_PATH;
  }

  public bookmarkExists(bookmark: string) {
    console.log(`Mocha: File Instance: Asserted bookmark '${bookmark}'`);

    return true;
  }

  public async downloadFileFromiCloud(filePath: string) {
    console.log(`Mocha: File Instance: Downloaded file from iCloud at '${filePath}'`);

    return Promise.resolve();
  }

  public isFileStoredIniCloud(filePath: string) {
    console.log(`Mocha: File Instance: Asserted file at '${filePath}' is stored in iCloud`);

    return true;
  }

  public isFileDownloaded(filePath: string) {
    console.log(`Mocha: File Instance: Asserted file at '${filePath}' is downloaded`);

    return true;
  }

  public creationDate(filePath: string) {
    const MOCK_CREATION_DATE = new Date();

    console.log(`Mocha: File Instance: Read creation date of file at '${filePath}': ${MOCK_CREATION_DATE.getTime()}`);

    return MOCK_CREATION_DATE;
  }

  public modificationDate(filePath: string) {
    const MOCK_MODIFICATION_DATE = new Date();

    console.log(`Mocha: File Instance: Read modification date of file at '${filePath}': ${MOCK_MODIFICATION_DATE.getTime()}`);

    return MOCK_MODIFICATION_DATE;
  }

  public fileSize(filePath: string) {
    const MOCK_FILE_SIZE = 1024; // in kilobytes

    console.log(`Mocha: File Instance: Read file size of file at '${filePath}': ${MOCK_FILE_SIZE} KB`);

    return MOCK_FILE_SIZE;
  }

  public allFileBookmarks() {
    const MOCK_FILE_BOOKMARKS = [
      {
        name: "My Bookmark",
        source: "host",
      },
      {
        name: "Siri Bookmark",
        source: "siri_shortcuts",
      },
    ];

    console.log(`Mocha: File Instance: Read all file bookmarks: ${JSON.stringify(MOCK_FILE_BOOKMARKS)}`);

    return MOCK_FILE_BOOKMARKS;
  }
}

const _File: typeof File = importModule("file/File");

class ReadOnlyFile extends _File {

  override delete() {
    throw new ReferenceError("File::ReadOnlyFile:delete(): Cannot delete a read-only file or folder.");
  }

  override write() {
    throw new ReferenceError("File::ReadOnlyFile:write(): Cannot write to or overwrite a read-only file.");
  }

  static get File(): typeof File {
    return _File;
  }

}

module.exports = ReadOnlyFile;

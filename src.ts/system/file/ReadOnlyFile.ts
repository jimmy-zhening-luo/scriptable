const File = importModule("File") as File;

class _ReadOnlyFile extends File {
  override delete() {
    throw new ReferenceError("File::ReadOnlyFile:delete(): Cannot delete a read-only file or folder.");
  }
  
  override write() {
    throw new ReferenceError("File::ReadOnlyFile:write(): Cannot write to or overwrite a read-only file.");
  }
}

module.exports = _ReadOnlyFile;

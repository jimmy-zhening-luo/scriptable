const _File: typeof File = importModule("file/File");

class ReadOnlyFile extends _File {

  override delete(): this {
    throw new ReferenceError(`File::ReadOnlyFile:delete(): Cannot delete a read-only file or folder.`);
  }

  override write(): this {
    throw new ReferenceError(`File::ReadOnlyFile:write(): Cannot write to or overwrite a read-only file.`);
  }

  static get File(): typeof File {
    try {
      return _File;
    } catch (e) {
      console.error(`File::ReadOnlyFile: File: Failed to import module File: ${e}`);
      throw e;
    }
  }

}

module.exports = ReadOnlyFile;

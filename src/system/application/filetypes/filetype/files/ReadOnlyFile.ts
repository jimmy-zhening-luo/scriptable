const _File: typeof File = importModule("file/File") as typeof File;

class ReadOnlyFile extends _File {
  override delete(): never {
    throw new ReferenceError(
      `File::ReadOnlyFile:delete(): Cannot delete a read-only file or folder.`,
    );
  }

  override write(): never {
    throw new ReferenceError(
      `File::ReadOnlyFile:write(): Cannot write to or overwrite a read-only file.`,
    );
  }

  static get File(): typeof File {
    try {
      return _File;
    }
    catch (e) {
      throw new ReferenceError(
        `File::ReadOnlyFile: File: Failed to import module File: \n${e}`,
      );
    }
  }
}

module.exports = ReadOnlyFile;

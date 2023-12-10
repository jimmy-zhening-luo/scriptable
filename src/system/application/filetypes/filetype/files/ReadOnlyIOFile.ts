const _IOFile: typeof IOFile = importModule("file/IOFile") as typeof IOFile;

class ReadOnlyIOFile extends _IOFile {
  public static get IOFile(): typeof IOFile {
    try {
      return _IOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `IOFile::ReadOnlyIOFile: IOFile: Failed to import module IOFile: \n${e as string}`,
      );
    }
  }

  public override delete(): never {
    throw new ReferenceError(
      `IOFile::ReadOnlyIOFile:delete(): Cannot delete a read-only file or folder.`,
    );
  }

  public override write(): never {
    throw new ReferenceError(
      `IOFile::ReadOnlyIOFile:write(): Cannot write to or overwrite a read-only file.`,
    );
  }
}

module.exports = ReadOnlyIOFile;

const _IOFile: typeof IOFile = importModule("file/IOFile") as typeof IOFile;

class ReadOnlyIOFile extends _IOFile {
  public static get IOFile(): typeof IOFile {
    try {
      return _IOFile;
    }
    catch (e) {
      throw new ReferenceError(
        `ReadOnlyIOFile: import IOFile: \n${e as string}`,
      );
    }
  }

  public override delete(): never {
    throw new ReferenceError(
      `ReadOnlyIOFile: delete: Forbidden Operation: Cannot delete a read-only file or folder.`,
    );
  }

  public override write(): never {
    throw new ReferenceError(
      `ReadOnlyIOFile: write: Forbidden Operation: Cannot write to or overwrite a read-only file.`,
    );
  }
}

module.exports = ReadOnlyIOFile;

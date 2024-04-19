const _IOFile: typeof IOFile = importModule("IOFile") as typeof IOFile;

class ReadOnlyIOFile extends _IOFile {
  public override delete(): never {
    throw new ReferenceError(
      `ReadOnlyIOFile: delete: Forbidden: Cannot delete a readonly file or folder.`,
    );
  }

  public override write(): never {
    throw new ReferenceError(
      `ReadOnlyIOFile: write: Forbidden: Cannot write to a readonly file.`,
    );
  }
}

module.exports = ReadOnlyIOFile;

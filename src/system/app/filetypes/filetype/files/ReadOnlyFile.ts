const r_IFile = importModule(
  "file/IFile",
) as typeof IFile;

class ReadOnlyFile extends r_IFile {
  public override delete(): never {
    throw new ReferenceError(
      `ReadOnlyFile: delete: Forbidden: Cannot delete readonly files/folders`,
      { cause: { path: this.path } },
    );
  }

  public override write(): never {
    throw new ReferenceError(
      `ReadOnlyFile: write: Forbidden: Cannot write to readonly files`,
      { cause: { path: this.path } },
    );
  }
}

module.exports = ReadOnlyFile;

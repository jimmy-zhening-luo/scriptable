const r_IFile: typeof IFile = importModule(
  "file/IFile",
) as typeof IFile;

class ReadOnlyFile extends r_IFile {
  public override delete(): never {
    throw new ReferenceError(
      `ReadOnlyFile: delete: Forbidden: Cannot delete readonly files/folders`,
    );
  }

  public override write(): never {
    throw new ReferenceError(
      `ReadOnlyFile: write: Forbidden: Cannot write to readonly files`,
    );
  }
}

module.exports = ReadOnlyFile;

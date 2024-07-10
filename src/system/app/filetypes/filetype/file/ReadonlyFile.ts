const _File = importModule(
  `File`,
) as typeof File;

class ReadonlyFile extends _File {
  public override write(): never {
    throw new ReferenceError(
      `Forbidden: ReadonlyFile: write`,
      { cause: String(this) },
    );
  }
}

module.exports = ReadonlyFile;

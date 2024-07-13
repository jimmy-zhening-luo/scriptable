const file = importModule(
  `File`,
) as typeof File;

class ReadonlyFile extends file {
  public override write(): never {
    throw new ReferenceError(
      `Forbidden: ReadonlyFile: write`,
      { cause: String(this) },
    );
  }
}

module.exports = ReadonlyFile;

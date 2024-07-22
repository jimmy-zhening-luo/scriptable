const file = importModule<typeof File>(
  `File`,
);

class ReadonlyFile extends file {
  public override write(): never {
    throw new ReferenceError(
      `ReadonlyFile: write forbidden`,
      { cause: String(this) },
    );
  }
}

module.exports = ReadonlyFile;

const _File = importModule(
  `File`,
) as typeof File;

class ReadonlyFile extends _File {
  public override write(): never {
    throw new ReferenceError(
      `ReadonlyFile: write`,
      { cause: this.path },
    );
  }
}

module.exports = ReadonlyFile;

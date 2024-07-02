import type IFile from "./file/IFile.js";

const iFile = importModule(
  `file/IFile`,
) as typeof IFile;

export default class ReadOnlyFile extends iFile {
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

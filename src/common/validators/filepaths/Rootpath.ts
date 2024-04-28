const r_Filepath: typeof Filepath = importModule("filepath/Filepath") as typeof Filepath;

class Rootpath extends r_Filepath<true> {
  public isOk(): boolean {
    try {
      return !this.isEmpty;
    }
    catch (e) {
      throw new EvalError(
        `Rootpath: isOk`,
        { cause: e },
      );
    }
  }

  public pop(): FilepathPart["string"] {
    try {
      const popped: Nullable<FilepathPart["string"]> = this._tree.pop() ?? null;

      if (popped === null)
        throw new RangeError(
          `Impossible: RootPath should always have at least one part`,
        );
      else if (this.isEmpty)
        throw new TypeError(
          `popping this element results in an empty path, you lose`,
        );
      else
        return popped;
    }
    catch (e) {
      throw new EvalError(
        `Rootpath: pop`,
        { cause: e },
      );
    }
  }
}

module.exports = Rootpath;

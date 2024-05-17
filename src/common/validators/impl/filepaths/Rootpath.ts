const r_Filepath: typeof IFilepath = importModule(
  "filepath/IFilepath",
) as typeof IFilepath;

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
      if (this._parts.length < 2)
        throw new RangeError(
          `Forbidden: pop() would cause empty root path`,
          {
            cause: {
              filepath: this.toString(),
              parts: this._parts,
              length: this._parts.length,
              hypotheticalPop: this._parts[0],
            },
          },
        );
      else {
        const popped: FilepathPart["string"] = this._parts[0];

        this._parts.pop();

        return popped;
      }
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

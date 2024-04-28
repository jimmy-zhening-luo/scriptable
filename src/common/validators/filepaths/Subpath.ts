const s_Filepath: typeof Filepath = importModule("filepath/Filepath") as typeof Filepath;

class Subpath extends s_Filepath<false> {
  public isOk(): true {
    try {
      return true;
    }
    catch (e) {
      throw new EvalError(
        `Subpath: isOk`,
        { cause: e },
      );
    }
  }

  public pop(): string {
    try {
      return this._tree.pop() ?? "";
    }
    catch (e) {
      throw new EvalError(
        `Subpath: pop`,
        { cause: e },
      );
    }
  }
}

module.exports = Subpath;

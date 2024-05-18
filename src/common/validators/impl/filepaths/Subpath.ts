const s_Filepath: typeof IFilepath = importModule(
  "filepath/IFilepath",
) as typeof IFilepath;

class Subpath extends s_Filepath<false> {
  protected check(
    parts: Part[],
  ): Part[] {
    try {
      return parts;
    }
    catch (e) {
      throw new EvalError(
        `Subpath: check`,
        { cause: e },
      );
    }
  }

  protected popRoot(): true {
    try {
      return true;
    }
    catch (e) {
      throw new EvalError(
        `Subpath: popRoot`,
        { cause: e },
      );
    }
  }
}

module.exports = Subpath;

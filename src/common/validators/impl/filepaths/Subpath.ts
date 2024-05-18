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

  protected popLeaf(partsQueue: Arrayful<Part>): Part {
    try {
      return partsQueue[0];
    }
    catch (e) {
      throw new EvalError(
        `Subpath: popLeaf`,
        { cause: e },
      );
    }
  }
}

module.exports = Subpath;

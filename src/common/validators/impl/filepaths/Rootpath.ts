const r_Filepath: typeof IFilepath = importModule(
  "filepath/IFilepath",
) as typeof IFilepath;

class Rootpath extends r_Filepath<true> {
  protected check(
    parts: Part[],
  ): Arrayful<Part> {
    try {
      if (parts.length < 1)
        throw new RangeError(
          `root path constructed with 0 parts`,
          {
            cause: {
              parts,
              length: parts.length,
            },
          },
        );
      else
        return parts as Arrayful<Part>;
    }
    catch (e) {
      throw new EvalError(
        `Rootpath: check`,
        { cause: e },
      );
    }
  }

  protected popLeaf(partsQueue: Arrayful<Part>): Part {
    try {
      if (partsQueue.length > 1)
        return partsQueue[0];
      else
        throw new RangeError(
          `root path has 1 part left, pop blocked`,
          {
            cause: {
              parts: this._parts,
              length: this._parts.length,
            },
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `Rootpath: popLeaf`,
        { cause: e },
      );
    }
  }
}

module.exports = Rootpath;

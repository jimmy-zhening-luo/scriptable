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
        return parts;
    }
    catch (e) {
      throw new EvalError(
        `Rootpath: check`,
        { cause: e },
      );
    }
  }

  protected popRoot(): false {
    try {
      return false;
    }
    catch (e) {
      throw new EvalError(
        `Rootpath: popRoot`,
        { cause: e },
      );
    }
  }
}

module.exports = Rootpath;

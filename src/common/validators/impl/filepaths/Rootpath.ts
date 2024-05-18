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

  protected poppable(parts: Part[]): parts is Arrayful<Part> {
    try {
      return parts.length > 1;
    }
    catch (e) {
      throw new EvalError(
        `Rootpath: poppable`,
        { cause: e },
      );
    }
  }
}

module.exports = Rootpath;

const f_IEngine: typeof IEngine = importModule(
  "engine/IEngine",
) as typeof IEngine;

class FindEngine extends f_IEngine {
  public readonly find: stringful;

  constructor(find: string) {
    try {
      super("find");

      if (find.length === 0)
        throw new SyntaxError(
          `no iOS Find provider specified`,
        );
      else
        this.find = find as stringful;
    }
    catch (e) {
      throw new EvalError(
        `FindEngine: ctor`,
        { cause: e },
      );
    }
  }

  protected options(): Required<Pick<SearchOutput, "find">> {
    try {
      return { find: this.find };
    }
    catch (e) {
      throw new EvalError(
        `FindEngine: options`,
        { cause: e },
      );
    }
  }
}

module.exports = FindEngine;

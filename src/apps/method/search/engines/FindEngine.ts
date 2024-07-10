const f_IEngine = importModule(
  `engine/IEngine`,
) as typeof IEngine;

class FindEngine extends f_IEngine {
  protected readonly find: string;

  constructor(find: string) {
    try {
      super("find");

      if (find.length > 0)
        this.find = find;
      else
        throw new ReferenceError(`no 'find' engine selected`);
    }
    catch (e) {
      throw new EvalError(
        `FindEngine: ctor`,
        { cause: e },
      );
    }
  }

  protected options() {
    try {
      const { find } = this;

      return { find };
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

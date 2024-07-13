const fIEngine = importModule(
  `engine/SearchEngine`,
) as typeof SearchEngine;

class FindEngine extends fIEngine {
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

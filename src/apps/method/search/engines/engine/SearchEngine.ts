abstract class SearchEngine {
  constructor(
    protected readonly app: string,
    protected readonly output: string | boolean = false,
  ) {}

  public resolve(query: Query) {
    try {
      if (query.locked)
        return {
          ...this.required(query),
          ...this.options(query),
        };
      else
        throw new SyntaxError(`Cannot resolve unlocked query`);
    }
    catch (e) {
      throw new EvalError(
        `SearchEngine: resolve [${String(query)}]`,
        { cause: e },
      );
    }
  }

  protected transform(query: Query): Unflat {
    try {
      return query.natural;
    }
    catch (e) {
      throw new EvalError(
        `SearchEngine: transform [${String(query)}]`,
        { cause: e },
      );
    }
  }

  private required(query: Query) {
    try {
      const { app, output } = this;

      return {
        app,
        action: this.transform(query),
        ...output === false
          ? {}
          : output === true || output.length < 1
            ? { output: "_" }
            : { output },
      };
    }
    catch (e) {
      throw new EvalError(
        `SearchEngine: required [${String(query)}]`,
        { cause: e },
      );
    }
  }

  protected abstract options(query: Query): Omit<SearchOutput, keyof ReturnType<SearchEngine["required"]>>;
}

module.exports = SearchEngine;

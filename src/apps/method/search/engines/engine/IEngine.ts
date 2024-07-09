abstract class IEngine {
  constructor(
    protected readonly app: string,
    protected readonly output:
      | string
      | boolean = false,
  ) {}

  public resolve(query: Query) {
    try {
      if (query.locked)
        return {
          ...this.required(query),
          ...this.options(query),
        };
      else
        throw new SyntaxError(
          `Cannot resolve unlocked query`,
          { cause: `[${String(query)}]` },
        );
    }
    catch (e) {
      throw new EvalError(
        `IEngine: resolve`,
        { cause: e },
      );
    }
  }

  protected transform(query: Query): Unflat<string> {
    try {
      return query.natural;
    }
    catch (e) {
      throw new EvalError(
        `IEngine: transform`,
        { cause: e },
      );
    }
  }

  private required(query: Query) {
    try {
      const {
        app,
        output,
      } = this;

      return {
        app,
        action: this.transform(query),
        ...output === false
          ? {}
          : {
            output: output === true
              ? "_"
              : output,
          },
      };
    }
    catch (e) {
      throw new EvalError(
        `IEngine: required`,
        { cause: e },
      );
    }
  }

  protected abstract options(query: Query): Omit<
    SearchOutput,
    keyof ReturnType<IEngine["required"]>
  >;
}

module.exports = IEngine;

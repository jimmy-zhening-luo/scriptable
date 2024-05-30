abstract class IEngine {
  constructor(
    protected readonly app: string,
  ) {}

  public resolve(
    query: Query,
  ) {
    try {
      if (
        !query
          .locked
      )
        throw new SyntaxError(
          `query unlocked`,
          { cause: { query: query.toString() } },
        );
      else {
        const { app } = this;
        const { postfix } = query;

        return {
          app,
          postfix,
          action: this
            .transform(
              query,
            ),
          ...this
            .options(
              query,
            ),
        };
      }
    }
    catch (e) {
      throw new EvalError(
        `Engine: resolve`,
        { cause: e },
      );
    }
  }

  protected transform(
    query: Query,
  ):
    | string
    | string[] {
    try {
      return query
        .natural;
    }
    catch (e) {
      throw new EvalError(
        `Engine: transform`,
        { cause: e },
      );
    }
  }

  protected abstract options(query: Query): Omit<SearchOutput, "app" | "action">;
}

module.exports = IEngine;

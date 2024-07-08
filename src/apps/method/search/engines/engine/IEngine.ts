abstract class IEngine {
  constructor(
    protected readonly app: string,
    protected readonly output = "",
  ) {}

  public resolve(
    query: Query,
  ) {
    try {
      if (query.locked)
        return {
          ...this
            .required(
              query,
            ),
          ...this
            .options(
              query,
            ),
        };
      else
        throw new SyntaxError(
          `query unlocked`,
          { cause: { query: String(query) } },
        );
    }
    catch (e) {
      throw new EvalError(
        `IEngine: resolve`,
        { cause: e },
      );
    }
  }

  protected transform(
    query: Query,
  ): Unflat<string> {
    try {
      return query
        .natural;
    }
    catch (e) {
      throw new EvalError(
        `IEngine: transform`,
        { cause: e },
      );
    }
  }

  private required(
    query: Query,
  ) {
    try {
      const {
        app,
        output,
      } = this;

      return {
        app,
        output,
        action: this
          .transform(
            query,
          ),
      };
    }
    catch (e) {
      throw new EvalError(
        `IEngine: required`,
        { cause: e },
      );
    }
  }

  protected abstract options(
    query: Query,
  ): Omit<
    SearchOutput
    ,
    Keys<
      ReturnType<
        IEngine[
          "required"
        ]
      >
    >
  >;
}

module.exports = IEngine;

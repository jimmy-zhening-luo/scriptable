abstract class IEngine {
  constructor(
    protected readonly app: string,
    protected readonly postfix: Null<string> = null,
  ) {}

  public resolve(
    query: Query,
  ) {
    try {
      if (
        query
          .locked
      )
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
  ):
    | string
    | string[] {
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
      const { app } = this;

      return {
        app,
        postfix: this
          .postfix
          ?? query
            .postfix,
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

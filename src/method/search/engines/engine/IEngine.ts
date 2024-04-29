abstract class IEngine {
  public readonly app: stringful;
  public readonly keys: stringful[];

  constructor(
    app: string,
    keys: string | string[],
  ) {
    try {
      if (app.length === 0)
        throw new SyntaxError(
          `engine 'app' field is empty`,
        );
      else {
        this.app = app as stringful;
        this.keys = [keys]
          .flat()
          .map(
            key =>
              key.toLowerCase(),
          )
          .filter(
            (key): key is stringful =>
              key.length !== 0,
          );

        if (this.keys.length === 0)
          throw new SyntaxError(
            `engine has no keys`,
          );
      }
    }
    catch (e) {
      throw new EvalError(
        `Engine: ctor`,
        { cause: e },
      );
    }
  }

  public parseQueryToAction(query: Query): SearchOutput {
    try {
      return {
        app: this.app,
        actions: this.transform(query),
        ...this.options(query),
      };
    }
    catch (e) {
      throw new EvalError(
        `Engine: parseQueryToAction`,
        { cause: e },
      );
    }
  }

  protected transform(query: Query): string | string[] {
    try {
      return query.natural;
    }
    catch (e) {
      throw new EvalError(
        `Engine: transform`,
        { cause: e },
      );
    }
  }

  protected abstract options(query: Query): Omit<SearchOutput, "app" | "actions">;
}

module.exports = IEngine;

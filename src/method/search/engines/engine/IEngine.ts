abstract class IEngine {
  constructor(public readonly app: string) {}

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

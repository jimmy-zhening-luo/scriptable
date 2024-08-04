abstract class SearchEngine<T extends "browser" | "find" | "shortcut"> {
  constructor(protected readonly app: T, protected readonly thing: string, protected readonly output: string | boolean = false) {}

  public resolve(query: Query) {
    if (query.locked)
      return { ...this.required(query), ...this.options(query) };
    else
      throw new SyntaxError(`Tried to resolve unlocked query`);
  }

  protected transform(query: Query): Unflat {
    return query.natural;
  }

  private required(query: Query) {
    const { app, thing, output } = this;

    return {
      app,
      [app]: thing,
      action: this.transform(query),
      ...output === false ? {} : output === true || output.length < 1 ? { output: "_" } : { output },
    };
  }

  protected abstract options(query: Query): Omit<SearchOutput, keyof ReturnType<SearchEngine<T>["required"]>>;
}

module.exports = SearchEngine;
export type { SearchEngine };

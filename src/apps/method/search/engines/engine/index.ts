abstract class SearchEngine {
  constructor(protected readonly app: string, protected readonly output: string | boolean = false) {}

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
    const { app, output } = this;

    return { app, action: this.transform(query), ...output === false ? {} : output === true || output.length < 1 ? { output: "_" } : { output } };
  }

  protected abstract options(query: Query): Omit<SearchOutput, keyof ReturnType<SearchEngine["required"]>>;
}

module.exports = SearchEngine;

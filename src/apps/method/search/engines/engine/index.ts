import type { Query } from "../../query";

abstract class SearchEngine<
  T extends
  | "browser"
  | "find"
  | "shortcut",
> {
  protected readonly output: Null<true>;

  constructor(
    protected readonly app: T,
    protected readonly engine: string,
    output = false,
  ) {
    this.output = output || null;
  }

  public resolve(query: Query) {
    return {
      ...this.required(query),
      ...this.optional(query),
    };
  }

  protected stringify(query: Query): Unflat {
    return query.natural;
  }

  private required(query: Query) {
    const { app, engine, output } = this;

    return {
      app,
      [app]: engine,
      output,
      action: this.stringify(query),
    };
  }

  protected abstract optional(query: Query): Omit<SearchOutput, keyof ReturnType<SearchEngine<T>["required"]>>;
}

module.exports = SearchEngine;
export type { SearchEngine, Query };

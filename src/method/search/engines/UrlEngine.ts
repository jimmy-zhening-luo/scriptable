const b_IEngine: typeof IEngine = importModule(
  "engine/IEngine",
) as typeof IEngine;

class UrlEngine extends b_IEngine {
  public readonly urls: stringful[];
  public readonly tag: stringful;
  public readonly browser: UrlEngineSetting["browser"];
  public readonly encode: UrlEngineSetting["encode"];

  constructor(
    urls: string | string[],
    TAG: stringful,
    browser?: UrlEngineSetting["browser"],
    encode?: UrlEngine["encode"],
  ) {
    try {
      super("safari");
      this.tag = TAG;
      this.browser = browser; // unsafe
      this.encode = encode; // unsafe
      this.urls = [urls]
        .flat()
        .filter(
          (url: string): url is stringful =>
            url.length > 0,
        );

      if (this.urls.length === 0)
        throw new SyntaxError(
          `engine has 0 urls`,
        );
    }
    catch (e) {
      throw new EvalError(
        `BrowserEngine: ctor`,
        { cause: e },
      );
    }
  }

  protected override transform(query: Query): string[] {
    try {
      const encodedQuery: string = query
        .terms
        .map(
          (term: stringful): string =>
            term
              .split("+")
              .map(
                (operand: string): string =>
                  encodeURI(operand),
              )
              .join("%2B"),
        )
        .join(this.encode ?? "+");

      return this
        .urls
        .map(
          (url: stringful): string =>
            url.replace(
              this.tag,
              encodedQuery,
            ),
        );
    }
    catch (e) {
      throw new EvalError(
        `BrowserEngine: transform`,
        { cause: e },
      );
    }
  }

  protected options(query: Query): Required<Pick<SearchOutput, "natural" | "browser">> {
    try {
      return {
        natural: query.natural,
        browser: this.browser,
      };
    }
    catch (e) {
      throw new EvalError(
        `BrowserEngine: options`,
        { cause: e },
      );
    }
  }
}

module.exports = UrlEngine;

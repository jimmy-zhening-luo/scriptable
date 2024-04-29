const b_IEngine: typeof IEngine = importModule(
  "engine/IEngine",
) as typeof IEngine;

class BrowserEngine extends b_IEngine {
  public readonly urls: stringful[];
  public readonly tag: stringful;
  public readonly browser: BrowserAction;
  public readonly encode: BrowserEncode;

  constructor(
    keys: string | string[],
    urls: string | string[],
    TAG: stringful,
    browser: BrowserAction = "default",
    encode: BrowserEncode = "+",
  ) {
    try {
      super(
        "safari",
        keys,
      );
      this.tag = TAG;
      this.browser = browser; // unsafe
      this.encode = encode; // unsafe
      this.urls = [urls]
        .flat()
        .filter(
          url =>
            url.length !== 0,
        ) as stringful[];

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
      const OP: string = "+";
      const ENCODED_OP: string = "%2B";
      const encodedQuery: string = query
        .terms
        .map(
          term =>
            term
              .split(OP)
              .map(
                operand =>
                  encodeURI(operand),
              )
              .join(ENCODED_OP),
        )
        .join(this.encode);

      return this
        .urls
        .map(
          url =>
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

module.exports = BrowserEngine;

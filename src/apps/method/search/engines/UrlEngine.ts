const uIEngine = importModule<typeof SearchEngine>(
  `engine/SearchEngine`,
);

class UrlEngine extends uIEngine {
  protected readonly urls: readonly stringful[];
  protected readonly TAG: stringful;
  protected readonly browser: string;
  protected readonly separator: string;
  protected readonly encodeComponent: boolean;
  protected readonly inprivate: boolean;
  private readonly PLUS: string;
  private readonly PLUS_ENCODED: string;

  constructor(
    urls: Unflat,
    TAG: stringful,
    browser = "",
    separator = "+",
    encodeComponent = false,
    inprivate = false,
    output?: string | boolean,
  ) {
    super(
      "browser",
      browser === "api"
        ? output ?? true
        : false,
    );
    this.TAG = TAG;
    this.browser = browser;
    this.separator = separator;
    this.encodeComponent = encodeComponent;
    this.inprivate = inprivate;
    this.PLUS = "+";
    this.PLUS_ENCODED = "%2B";

    const urlfuls = [urls]
      .flat()
      .filter((url): url is stringful => url.length > 0);

    if (urlfuls.length > 0)
      this.urls = urlfuls;
    else
      throw new SyntaxError(`URL engine has no search URLs`);
  }

  protected override transform(query: Query) {
    try {
      const {
        TAG,
        separator,
        encodeComponent,
        PLUS,
        PLUS_ENCODED,
      } = this,
            encoder = encodeComponent
              ? function (operand: string) {
                return encodeURI(operand);
              }

              : function (operand: string) {
                return encodeURIComponent(operand);
              },
            encodedQuery = query
              .terms
              .map(
                term => term
                  .split(PLUS)
                  .map(encoder)
                  .join(PLUS_ENCODED),
              )
              .join(separator);

      return this
        .urls
        .map(
          url => url.replace(
            TAG,
            encodedQuery,
          ),
        );
    }
    catch (e) {
      throw new Error(
        `BrowserEngine: transform`,
        { cause: e },
      );
    }
  }

  protected options(query: Query) {
    const { browser, inprivate } = this,
          { natural } = query;

    return {
      browser,
      natural,
      ...inprivate ? { inprivate } : {},
    };
  }
}

module.exports = UrlEngine;

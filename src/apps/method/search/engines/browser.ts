import type { SearchEngine, Query } from "./engine/index";

const bSearchEngine = importModule<typeof SearchEngine>("./engine/index");

class BrowserEngine extends bSearchEngine<"browser"> {
  protected readonly urls: readonly stringful[];
  protected readonly TAG: stringful;
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
  ) {
    super(
      "browser",
      browser,
      browser === "api",
    );
    this.TAG = TAG;
    this.separator = separator;
    this.encodeComponent = encodeComponent;
    this.inprivate = inprivate;
    this.PLUS = "+";
    this.PLUS_ENCODED = "%2B";

    const urlfuls = [urls].flat().filter((url): url is stringful => url.length > 0);

    if (urlfuls.length > 0)
      this.urls = urlfuls;
    else
      throw new SyntaxError(`URL engine has no search URLs`);
  }

  protected override stringify(query: Query) {
    const {
      TAG,
      separator,
      encodeComponent,
      PLUS,
      PLUS_ENCODED,
    } = this,
    encoder = encodeComponent
      ? function (operand: string) { return encodeURI(operand); }
      : function (operand: string) { return encodeURIComponent(operand); },
    encodedQuery = query.terms
      .map(term => term
        .split(PLUS)
        .map(encoder)
        .join(PLUS_ENCODED))
      .join(separator);

    return this.urls.map(url => url.replace(TAG, encodedQuery));
  }

  protected optional(query: Query) {
    const { natural } = query,
    { inprivate } = this;

    return { natural, ...inprivate ? { inprivate } : {} };
  }
}

module.exports = BrowserEngine;
export type { BrowserEngine as default };

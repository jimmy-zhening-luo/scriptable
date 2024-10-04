import type { SearchEngine, Query } from "./engine/index";

const bSearchEngine = importModule<typeof SearchEngine>("./engine/index");

class BrowserEngine extends bSearchEngine<"browser"> {
  private readonly urls: readonly stringful[];
  private readonly TAG: stringful;
  private readonly separator: string;
  private readonly encodeComponent: boolean;
  private readonly inprivate: Null<true>;
  private readonly PLUS = {
    plain: "+",
    encoded: "%2B",
  } as const;

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
    this.urls = [urls].flat().filter((url): url is stringful => url.length > 0);

    if (this.urls.length < 1)
      throw new TypeError(`URL search engine has no URLs`);

    this.TAG = TAG;
    this.separator = separator;
    this.encodeComponent = encodeComponent;
    this.inprivate = inprivate ? inprivate : null;
  }

  protected override stringify(query: Query) {
    const {
      encodeComponent,
      separator,
      PLUS,
      TAG,
    } = this,
    encoder = encodeComponent
      ? function (operand: string) { return encodeURI(operand); }
      : function (operand: string) { return encodeURIComponent(operand); },
    encodedQuery = query.terms
      .map(term => term
        .split(PLUS.plain)
        .map(encoder)
        .join(PLUS.encoded))
      .join(separator);

    return this.urls.map(url => url.replace(TAG, encodedQuery));
  }

  protected optional(query: Query) {
    const { inprivate } = this,
    { natural } = query;
    
    return { natural, inprivate };
  }
}

module.exports = BrowserEngine;
export type { BrowserEngine as default };

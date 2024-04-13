class Browser {
  public static get Url(): typeof Url {
    try {
      return importModule("Url") as typeof Url;
    }
    catch (e) {
      throw new Error(`Browser: get Url: error loading module: \n${e as string}`);
    }
  }

  public static get UrlParts(): typeof UrlParts {
    try {
      return Browser.Url.UrlParts;
    }
    catch (e) {
      throw new Error(`Browser: get UrlParts: error loading module: \n${e as string}`);
    }
  }
}

module.exports = Browser;

class Browser {
  static get Url(): typeof Url {
    try {
      return importModule("Url");
    } catch (e) {
      throw new Error(`Browser: get Url: error getting Url: ${e}`);
    }
  }

  static get UrlParts(): typeof UrlParts {
    try {
      return Browser.Url.UrlParts;
    } catch (e) {
      throw new Error(`Browser: get UrlParts: error getting UrlParts: ${e}`);
    }
  }

  static get Api(): typeof Api {
    try {
      return importModule("Api");
    } catch (e) {
      throw new Error(`Browser: get Api: error getting Api: ${e}`);
    }
  }

  static get Callback(): typeof Callback {
    try {
      return importModule("Callback");
    } catch (e) {
      throw new Error(`Browser: get Callback: error getting Callback: ${e}`);
    }
  }

  static get Endpoint(): typeof Endpoint {
    try {
      return importModule("Endpoint");
    } catch (e) {
      throw new Error(`Browser: get Endpoint: error getting Endpoint: ${e}`);
    }
  }
}

module.exports = Browser;

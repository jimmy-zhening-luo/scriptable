class Browser {
  static get Url(): typeof Url {
    try {
      return importModule("Url") as typeof Url;
    } catch (e) {
      throw new Error(`Browser: get Url: error getting Url: \n${e}`);
    }
  }

  static get UrlParts(): typeof UrlParts {
    try {
      return Browser.Url.UrlParts;
    } catch (e) {
      throw new Error(`Browser: get UrlParts: error getting UrlParts: \n${e}`);
    }
  }

  static get Api(): typeof Api {
    try {
      return importModule("Api") as typeof Api;
    } catch (e) {
      throw new Error(`Browser: get Api: error getting Api: \n${e}`);
    }
  }

  static get Callback(): typeof Callback {
    try {
      return importModule("Callback") as typeof Callback;
    } catch (e) {
      throw new Error(`Browser: get Callback: error getting Callback: \n${e}`);
    }
  }

  static get Endpoint(): typeof Endpoint {
    try {
      return importModule("Endpoint") as typeof Endpoint;
    } catch (e) {
      throw new Error(`Browser: get Endpoint: error getting Endpoint: \n${e}`);
    }
  }
}

module.exports = Browser;

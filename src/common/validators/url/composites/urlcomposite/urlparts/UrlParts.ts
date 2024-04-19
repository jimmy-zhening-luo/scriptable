class UrlParts {
  public static get UrlPart(): typeof UrlPart {
    try {
      return UrlParts.UrlScheme.UrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlScheme(): typeof UrlScheme {
    try {
      return importModule("UrlScheme") as typeof UrlScheme;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlHost(): typeof UrlHost {
    try {
      return importModule("UrlHost") as typeof UrlHost;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlPort(): typeof UrlPort {
    try {
      return importModule("UrlPort") as typeof UrlPort;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlPath(): typeof UrlPath {
    try {
      return importModule("UrlPath") as typeof UrlPath;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlQuery(): typeof UrlQuery {
    try {
      return importModule("UrlQuery") as typeof UrlQuery;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlFragment(): typeof UrlFragment {
    try {
      return importModule("UrlFragment") as typeof UrlFragment;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading module`,
        { cause: e },
      );
    }
  }
}

module.exports = UrlParts;

class UrlParts {
  static get UrlPart(): typeof UrlPart {
    try {
      return UrlParts.Scheme.UrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading parent UrlPart module: \n${e}`,
      );
    }
  }

  static get Scheme(): typeof Scheme {
    try {
      return importModule("Scheme") as typeof Scheme;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading parent Scheme module: \n${e}`,
      );
    }
  }

  static get Host(): typeof Host {
    try {
      return importModule("Host") as typeof Host;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading parent Host module: \n${e}`,
      );
    }
  }

  static get Port(): typeof Port {
    try {
      return importModule("Port") as typeof Port;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading parent Port module: \n${e}`,
      );
    }
  }

  static get Path(): typeof Path {
    try {
      return importModule("Path") as typeof Path;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading parent Path module: \n${e}`,
      );
    }
  }

  static get Query(): typeof Query {
    try {
      return importModule("Query") as typeof Query;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading parent Query module: \n${e}`,
      );
    }
  }

  static get Fragment(): typeof Fragment {
    try {
      return importModule("Fragment") as typeof Fragment;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlParts: error loading parent Fragment module: \n${e}`,
      );
    }
  }
}

module.exports = UrlParts;

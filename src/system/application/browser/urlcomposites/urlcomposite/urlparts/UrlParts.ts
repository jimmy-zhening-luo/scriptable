class UrlParts {
  static get UrlPart(): typeof UrlPart {
    return importModule("urlpart/UrlPart");
  }

  static get Scheme(): typeof Scheme {
    return importModule("Scheme");
  }

  static get Host(): typeof Host {
    return importModule("Host");
  }

  static get Port(): typeof Port {
    return importModule("Port");
  }

  static get Path(): typeof Path {
    return importModule("Path");
  }

  static get Query(): typeof Query {
    return importModule("Query");
  }

  static get Fragment(): typeof Fragment {
    return importModule("Fragment");
  }
}

module.exports = UrlParts;

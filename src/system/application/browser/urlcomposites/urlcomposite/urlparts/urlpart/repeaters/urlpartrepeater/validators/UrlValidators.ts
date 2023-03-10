class UrlValidators {
  static get ValidUrlPart(): typeof ValidUrlPart {
    try {
      return UrlValidators.ValidUrlRepeater.ValidUrlPart;
    } catch (e) {
      throw new ReferenceError(
        `UrlValidators: error loading ValidUrlPart module: \n${e}`,
      );
    }
  }

  static get ValidUrlRepeater(): typeof ValidUrlRepeater {
    try {
      return importModule("validurlpart/ValidUrlRepeater");
    } catch (e) {
      throw new ReferenceError(
        `UrlValidators: error loading ValidUrlRepeater module: \n${e}`,
      );
    }
  }

  static get Scheme(): typeof ValidScheme {
    try {
      return importModule("ValidScheme");
    } catch (e) {
      throw new ReferenceError(
        `UrlValidators: error loading ValidScheme module: \n${e}`,
      );
    }
  }

  static get Char(): typeof Char {
    try {
      return UrlValidators.ValidUrlPart.Char;
    } catch (e) {
      throw new ReferenceError(
        `UrlValidators: error loading Char module: \n${e}`,
      );
    }
  }

  static get UrlChar(): typeof UrlChar {
    try {
      return UrlValidators.ValidUrlPart.UrlChar;
    } catch (e) {
      throw new ReferenceError(
        `UrlValidators: error loading UrlChar module: \n${e}`,
      );
    }
  }

  static get Host(): {
    Repeaters: {
      IPv4: typeof ValidHostIPv4Repeater;
      IPv6: typeof ValidHostIPv6Repeater;
      RegName: typeof ValidHostRegNameRepeater;
    };
  } {
    try {
      return {
        Repeaters: {
          IPv4: importModule("ValidHostIPv4Repeater"),
          IPv6: importModule("ValidHostIPv6Repeater"),
          RegName: importModule("ValidHostRegNameRepeater"),
        },
      };
    } catch (e) {
      throw new ReferenceError(
        `UrlValidators: error loading Host module: \n${e}`,
      );
    }
  }

  static get Port(): typeof ValidPort {
    try {
      return importModule("ValidPort");
    } catch (e) {
      throw new ReferenceError(
        `UrlValidators: error loading ValidPort module: \n${e}`,
      );
    }
  }

  static get Path(): {
    Repeaters: {
      Path: typeof ValidPathRepeater;
    };
  } {
    try {
      return {
        Repeaters: {
          Path: importModule("ValidPathRepeater"),
        },
      };
    } catch (e) {
      throw new ReferenceError(
        `UrlValidators: error loading Path module: \n${e}`,
      );
    }
  }

  static get Query(): {
    Repeaters: {
      Query: typeof ValidQueryRepeater;
    };
  } {
    try {
      return {
        Repeaters: {
          Query: importModule("ValidQueryRepeater"),
        },
      };
    } catch (e) {
      throw new ReferenceError(
        `UrlValidators: error loading Query module: \n${e}`,
      );
    }
  }

  static get Fragment(): typeof ValidFragment {
    try {
      return importModule("ValidFragment");
    } catch (e) {
      throw new ReferenceError(
        `UrlValidators: error loading ValidFragment module: \n${e}`,
      );
    }
  }
}

module.exports = UrlValidators;

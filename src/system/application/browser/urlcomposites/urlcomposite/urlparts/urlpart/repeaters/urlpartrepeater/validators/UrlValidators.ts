class UrlValidators {
  static get ValidUrlPart(): typeof ValidUrlPart {
    return importModule("validurlpart/ValidUrlPart");
  }

  static get ValidUrlRepeater(): typeof ValidUrlRepeater {
    return importModule("validurlpart/ValidUrlRepeater");
  }

  static get Scheme(): typeof ValidScheme {
    return importModule("ValidScheme");
  }

  static get Char(): typeof Char {
    return UrlValidators.ValidUrlPart.Char;
  }

  static get UrlChar(): typeof UrlChar {
    return UrlValidators.ValidUrlPart.UrlChar;
  }

  static get Host(): {
    Repeaters: {
      IPv4: typeof ValidHostIPv4Repeater;
      IPv6: typeof ValidHostIPv6Repeater;
      RegName: typeof ValidHostRegNameRepeater;
    };
  } {
    return {
      Repeaters: {
        IPv4: importModule("ValidHostIPv4Repeater"),
        IPv6: importModule("ValidHostIPv6Repeater"),
        RegName: importModule("ValidHostRegNameRepeater"),
      },
    };
  }

  static get Port(): typeof ValidPort {
    return importModule("ValidPort");
  }

  static get Path(): {
    Repeaters: {
      Path: typeof ValidPathRepeater;
    };
  } {
    return {
      Repeaters: {
        Path: importModule("ValidPathRepeater"),
      },
    };
  }

  static get Query(): {
    Repeaters: {
      Query: typeof ValidQueryRepeater;
    };
  } {
    return {
      Repeaters: {
        Query: importModule("ValidQueryRepeater"),
      },
    };
  }

  static get Fragment(): typeof ValidFragment {
    return importModule("ValidFragment");
  }
}

module.exports = UrlValidators;

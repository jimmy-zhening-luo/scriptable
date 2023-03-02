class Repeaters {
  static get UrlPartRepeater(): typeof UrlPartRepeater {
    return importModule("urlpartrepeater/UrlPartRepeater");
  }

  static get UrlValidators(): typeof UrlValidators {
    return Repeaters.UrlPartRepeater.UrlValidators;
  }

  static get HostIPv4Repeater(): typeof HostIPv4Repeater {
    return importModule("HostIPv4Repeater");
  }

  static get HostIPv6Repeater(): typeof HostIPv6Repeater {
    return importModule("HostIPv6Repeater");
  }

  static get HostRegNameRepeater(): typeof HostRegNameRepeater {
    return importModule("HostRegNameRepeater");
  }

  static get PathRepeater(): typeof PathRepeater {
    return importModule("PathRepeater");
  }

  static get QueryRepeater(): typeof QueryRepeater {
    return importModule("QueryRepeater");
  }
}

module.exports = Repeaters;

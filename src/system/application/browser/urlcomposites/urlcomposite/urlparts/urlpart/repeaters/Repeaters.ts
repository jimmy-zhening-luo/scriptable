class Repeaters {
  static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return importModule("urlpartrepeater/UrlPartRepeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading parent UrlPartRepeater module: ${e}`,
      );
    }
  }

  static get UrlValidators(): typeof UrlValidators {
    try {
      return Repeaters.UrlPartRepeater.UrlValidators;
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading UrlValidators module: ${e}`,
      );
    }
  }

  static get HostIPv4Repeater(): typeof HostIPv4Repeater {
    try {
      return importModule("HostIPv4Repeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading HostIPv4Repeater module: ${e}`,
      );
    }
  }

  static get HostIPv6Repeater(): typeof HostIPv6Repeater {
    try {
      return importModule("HostIPv6Repeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading HostIPv6Repeater module: ${e}`,
      );
    }
  }

  static get HostRegNameRepeater(): typeof HostRegNameRepeater {
    try {
      return importModule("HostRegNameRepeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading HostRegNameRepeater module: ${e}`,
      );
    }
  }

  static get PathRepeater(): typeof PathRepeater {
    try {
      return importModule("PathRepeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading PathRepeater module: ${e}`,
      );
    }
  }

  static get QueryRepeater(): typeof QueryRepeater {
    try {
      return importModule("QueryRepeater");
    } catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading QueryRepeater module: ${e}`,
      );
    }
  }
}

module.exports = Repeaters;

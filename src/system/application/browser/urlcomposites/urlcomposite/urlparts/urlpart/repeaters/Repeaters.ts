class Repeaters {
  public static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return Repeaters.PathRepeater.UrlPartRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading parent UrlPartRepeater module: \n${e as string}`,
      );
    }
  }

  public static get UrlValidators(): typeof UrlValidators {
    try {
      return Repeaters.UrlPartRepeater.UrlValidators;
    }
    catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading UrlValidators module: \n${e as string}`,
      );
    }
  }

  public static get HostIPv4Repeater(): typeof HostIPv4Repeater {
    try {
      return importModule("HostIPv4Repeater") as typeof HostIPv4Repeater;
    }
    catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading HostIPv4Repeater module: \n${e as string}`,
      );
    }
  }

  public static get HostIPv6Repeater(): typeof HostIPv6Repeater {
    try {
      return importModule("HostIPv6Repeater") as typeof HostIPv6Repeater;
    }
    catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading HostIPv6Repeater module: \n${e as string}`,
      );
    }
  }

  public static get HostRegNameRepeater(): typeof HostRegNameRepeater {
    try {
      return importModule("HostRegNameRepeater") as typeof HostRegNameRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading HostRegNameRepeater module: \n${e as string}`,
      );
    }
  }

  public static get PathRepeater(): typeof PathRepeater {
    try {
      return importModule("PathRepeater") as typeof PathRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading PathRepeater module: \n${e as string}`,
      );
    }
  }

  public static get QueryRepeater(): typeof QueryRepeater {
    try {
      return importModule("QueryRepeater") as typeof QueryRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `Repeaters: error loading QueryRepeater module: \n${e as string}`,
      );
    }
  }
}

module.exports = Repeaters;

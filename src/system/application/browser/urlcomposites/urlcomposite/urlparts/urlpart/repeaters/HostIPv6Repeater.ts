const hips_UrlPartRepeater: typeof UrlPartRepeater = importModule(
  "urlpartrepeater/UrlPartRepeater",
);

class HostIPv6Repeater extends hips_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    try {
      return new this.ValidHostIPv6Repeater(repeater).value;
    } catch (e) {
      throw new Error(
        `HostIPv6Repeater: parse: error parsing HostIPv6Repeater: ${e}`,
      );
    }
  }

  protected get ValidHostIPv6Repeater(): typeof ValidHostIPv6Repeater {
    try {
      return this.UrlValidators.Host.Repeaters.IPv6;
    } catch (e) {
      throw new ReferenceError(
        `HostIPv6Repeater: error loading ValidHostIPv6Repeater module: ${e}`,
      );
    }
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return hips_UrlPartRepeater;
    } catch (e) {
      throw new ReferenceError(
        `HostIPv6Repeater: error loading parent UrlPartRepeater module: ${e}`,
      );
    }
  }
}

module.exports = HostIPv6Repeater;

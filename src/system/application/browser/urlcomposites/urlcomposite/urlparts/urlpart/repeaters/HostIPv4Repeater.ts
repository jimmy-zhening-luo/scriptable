const hipf_UrlPartRepeater: typeof UrlPartRepeater = importModule(
  "urlpartrepeater/UrlPartRepeater",
);

class HostIPv4Repeater extends hipf_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    try {
      return new this.ValidHostIPv4Repeater(repeater).value;
    } catch (e) {
      throw new Error(
        `HostIPv4Repeater: parse: error parsing HostIPv4Repeater: ${e}`,
      );
    }
  }

  protected get ValidHostIPv4Repeater(): typeof ValidHostIPv4Repeater {
    try {
      return this.UrlValidators.Host.Repeaters.IPv4;
    } catch (e) {
      throw new ReferenceError(
        `HostIPv4Repeater: error loading ValidHostIPv4Repeater module: ${e}`,
      );
    }
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return hipf_UrlPartRepeater;
    } catch (e) {
      throw new ReferenceError(
        `HostIPv4Repeater: error loading parent UrlPartRepeater module: ${e}`,
      );
    }
  }
}

module.exports = HostIPv4Repeater;

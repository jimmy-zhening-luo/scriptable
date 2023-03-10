const hipf_UrlPartRepeater: typeof UrlPartRepeater = importModule(
  "urlpartrepeater/UrlPartRepeater",
);

class HostIPv4Repeater extends hipf_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    try {
      return new HostIPv4Repeater.ValidHostIPv4Repeater(repeater).value;
    } catch (e) {
      throw new Error(
        `HostIPv4Repeater: parse: error parsing HostIPv4Repeater: \n${e}`,
      );
    }
  }

  static get ValidHostIPv4Repeater(): typeof ValidHostIPv4Repeater {
    try {
      return HostIPv4Repeater.UrlValidators.Host.Repeaters.IPv4;
    } catch (e) {
      throw new ReferenceError(
        `HostIPv4Repeater: error loading ValidHostIPv4Repeater module: \n${e}`,
      );
    }
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return hipf_UrlPartRepeater;
    } catch (e) {
      throw new ReferenceError(
        `HostIPv4Repeater: error loading parent UrlPartRepeater module: \n${e}`,
      );
    }
  }
}

module.exports = HostIPv4Repeater;

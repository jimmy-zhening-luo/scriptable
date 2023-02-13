const hipf_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostIPv4Repeater extends hipf_UrlPartRepeater {

  protected parse(repeater: string): null | string {
    return new this.ValidHostIPv4Repeater(repeater).value;
  }

  protected get ValidHostIPv4Repeater(): typeof ValidHostIPv4Repeater {
    return this.UrlValidators.Host.Repeaters.IPv4;
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    return hipf_UrlPartRepeater;
  }

}

module.exports = HostIPv4Repeater;

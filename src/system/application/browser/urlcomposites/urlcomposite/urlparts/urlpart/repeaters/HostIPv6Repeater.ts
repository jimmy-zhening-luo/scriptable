const hips_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class HostIPv6Repeater extends hips_UrlPartRepeater {

  protected parse(repeater: string): null | string {
    return new this.ValidHostIPv6Repeater(repeater).value;
  }

  protected get ValidHostIPv6Repeater(): typeof ValidHostIPv6Repeater {
    return this.UrlValidators.Host.Repeaters.IPv6;
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    return hips_UrlPartRepeater;
  }

}

module.exports = HostIPv6Repeater;

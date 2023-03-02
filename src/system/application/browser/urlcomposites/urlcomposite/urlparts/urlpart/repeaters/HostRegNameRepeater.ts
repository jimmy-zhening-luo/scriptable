const hrn_UrlPartRepeater: typeof UrlPartRepeater = importModule(
  "urlpartrepeater/UrlPartRepeater",
);

class HostRegNameRepeater extends hrn_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    return new this.ValidHostRegNameRepeater(repeater).value;
  }

  protected get ValidHostRegNameRepeater(): typeof ValidHostRegNameRepeater {
    return this.UrlValidators.Host.Repeaters.RegName;
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    return hrn_UrlPartRepeater;
  }
}

module.exports = HostRegNameRepeater;

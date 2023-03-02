const hrn_UrlPartRepeater: typeof UrlPartRepeater = importModule(
  "urlpartrepeater/UrlPartRepeater",
);

class HostRegNameRepeater extends hrn_UrlPartRepeater {
  protected parse(repeater: string): null | string {
    try {
      return new this.ValidHostRegNameRepeater(repeater).value;
    } catch (e) {
      throw new Error(
        `HostRegNameRepeater: parse: error parsing HostRegNameRepeater: ${e}`,
      );
    }
  }

  protected get ValidHostRegNameRepeater(): typeof ValidHostRegNameRepeater {
    try {
      return this.UrlValidators.Host.Repeaters.RegName;
    } catch (e) {
      throw new ReferenceError(
        `HostRegNameRepeater: error loading ValidHostRegNameRepeater module: ${e}`,
      );
    }
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return hrn_UrlPartRepeater;
    } catch (e) {
      throw new ReferenceError(
        `HostRegNameRepeater: error loading parent UrlPartRepeater module: ${e}`,
      );
    }
  }
}

module.exports = HostRegNameRepeater;

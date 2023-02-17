const pa_UrlPartRepeater: typeof UrlPartRepeater = importModule("urlpartrepeater/UrlPartRepeater");

class PathRepeater extends pa_UrlPartRepeater {

  protected parse(repeater: string): null | string {
    return new this.ValidPathRepeater(repeater).value;
  }

  protected get ValidPathRepeater(): typeof ValidFilepathRepeater {
    return this.UrlValidators.Path.Repeaters.Path;
  }

  static get UrlPartRepeater(): typeof UrlPartRepeater {
    return pa_UrlPartRepeater;
  }

}

module.exports = PathRepeater;

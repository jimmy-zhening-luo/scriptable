const pa_UrlPartRepeater: typeof UrlPartRepeater = importModule(
  "urlpartrepeater/UrlPartRepeater",
) as typeof UrlPartRepeater;

class PathRepeater extends pa_UrlPartRepeater {
  public static get ValidPathRepeater(): typeof ValidPathRepeater {
    try {
      return PathRepeater.UrlValidators.Path.Repeaters.Path;
    }
    catch (e) {
      throw new ReferenceError(
        `PathRepeater: error loading ValidPathRepeater module: \n${e as string}`,
      );
    }
  }

  public static get UrlPartRepeater(): typeof UrlPartRepeater {
    try {
      return pa_UrlPartRepeater;
    }
    catch (e) {
      throw new ReferenceError(
        `PathRepeater: error loading parent UrlPartRepeater module: \n${e as string}`,
      );
    }
  }

  protected parse(repeater: string): null | string {
    try {
      return new PathRepeater.ValidPathRepeater(repeater).value;
    }
    catch (e) {
      throw new Error(
        `PathRepeater: parse: error parsing PathRepeater: \n${e as string}`,
      );
    }
  }
}

module.exports = PathRepeater;

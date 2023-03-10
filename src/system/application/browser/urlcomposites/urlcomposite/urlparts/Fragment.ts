const fr_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Fragment extends fr_UrlPart {
  constructor(fragment?: string | Fragment) {
    try {
      super(fragment);
    } catch (e) {
      throw new SyntaxError(
        `Fragment: constructor: error creating Fragment: \n${e}`,
      );
    }
  }

  protected parse(fragment: string): null | string {
    try {
      return fragment.trim() === "#" || fragment.trim() === ""
        ? null
        : new Fragment.ValidFragment(fragment).value;
    } catch (e) {
      throw new SyntaxError(`Fragment: parse: error parsing Fragment: \n${e}`);
    }
  }

  static get ValidFragment(): typeof ValidFragment {
    try {
      return Fragment.UrlValidators.Fragment;
    } catch (e) {
      throw new ReferenceError(
        `Fragment: error loading ValidFragment module: \n${e}`,
      );
    }
  }

  static get UrlPart(): typeof UrlPart {
    try {
      return fr_UrlPart;
    } catch (e) {
      throw new ReferenceError(
        `Fragment: error loading parent UrlPart module: \n${e}`,
      );
    }
  }
}

module.exports = Fragment;

const fr_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Fragment extends fr_UrlPart {
  constructor(fragment?: null | string | Fragment) {
    try {
      super(fragment);
    } catch (e) {
      throw new Error(`Fragment: constructor: error creating Fragment: ${e}`);
    }
  }

  protected parse(fragment: string): null | string {
    try {
      return fragment.trim() === "#" || fragment.trim() === ""
        ? null
        : new this.ValidFragment(fragment).value;
    } catch (e) {
      throw new Error(`Fragment: parse: error parsing Fragment: ${e}`);
    }
  }

  protected get ValidFragment(): typeof ValidFragment {
    try {
      return this.UrlValidators.Fragment;
    } catch (e) {
      throw new ReferenceError(
        `Fragment: error loading ValidFragment module: ${e}`,
      );
    }
  }

  static get UrlPart(): typeof UrlPart {
    try {
      return fr_UrlPart;
    } catch (e) {
      throw new ReferenceError(
        `Fragment: error loading parent UrlPart module: ${e}`,
      );
    }
  }
}

module.exports = Fragment;

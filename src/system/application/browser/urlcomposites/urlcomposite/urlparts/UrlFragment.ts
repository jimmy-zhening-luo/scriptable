const fr_UrlPart: typeof UrlPart = importModule(
  "urlpart/UrlPart",
) as typeof UrlPart;

class UrlFragment extends fr_UrlPart {
  constructor(fragment?: string | UrlFragment) {
    try {
      super(fragment);
    }
    catch (e) {
      throw new SyntaxError(
        `UrlFragment: constructor: error creating UrlFragment: \n${e as string}`,
      );
    }
  }

  public static get ValidFragment(): typeof ValidFragment {
    try {
      return UrlFragment.UrlValidators.Fragment;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlFragment: error loading module: \n${e as string}`,
      );
    }
  }

  public static get UrlPart(): typeof UrlPart {
    try {
      return fr_UrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlFragment: error loading module: \n${e as string}`,
      );
    }
  }

  protected parse(fragment: string): null | string {
    try {
      return fragment.trim() === "#" || fragment.trim() === ""
        ? null
        : new UrlFragment.ValidFragment(fragment).value;
    }
    catch (e) {
      throw new SyntaxError(`UrlFragment: parse: error parsing UrlFragment: \n${e as string}`);
    }
  }
}

module.exports = UrlFragment;

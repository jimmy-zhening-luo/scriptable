const fr_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Fragment extends fr_UrlPart {

  constructor(
    fragment?:
      | null
      | string
      | Fragment
  ) {
    super(fragment);
  }


  protected parse(
    fragment: string
  ): null | string {
    return (
      fragment.trim() === "#"
      || fragment.trim() === ""
    ) ?
      null
      : new this
        .ValidFragment(fragment)
        .value;
  }

  protected get ValidFragment(): typeof ValidFragment {
    return this.UrlValidators.Fragment;
  }

  static get UrlPart(): typeof UrlPart {
    return fr_UrlPart;
  }

}

module.exports = Fragment;

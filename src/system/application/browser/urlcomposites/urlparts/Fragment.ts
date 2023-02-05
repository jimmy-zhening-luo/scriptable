const fr_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Fragment extends fr_UrlPart {
  readonly encode: boolean;
  constructor(
    fragment?: string
      | Fragment,
    encode: boolean = true
  ) {
    super(fragment);
    this.encode = encode;
  }

  protected parse(
    fragment: string
  ): null | string {
    return new Fragment._ValidFragment(fragment)
      .toString();
  }
}

namespace Fragment {
  export const _ValidFragment: typeof ValidFragment = importModule("validators/ValidFragment");
}

module.exports = Fragment;

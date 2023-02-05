const fr_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

// WIP
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

  override get string(): string {
    return this.encode ?
      encodeURIComponent(super.string)
      : super.string;
  }

  protected parse(
    fragment: string
  ): string {
    return new Fragment._ValidFragment(fragment)
      .cleaned;
  }
}

namespace Fragment {
  export const _ValidFragment: typeof ValidFragment = importModule("validators/ValidFragment");
}

module.exports = Fragment;

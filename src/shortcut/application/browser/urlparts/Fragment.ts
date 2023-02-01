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
    return new FragmentValidator(fragment)
      .cleaned;
  }
}

module.exports = Fragment;

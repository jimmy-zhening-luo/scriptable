class Scheme extends UrlPart {
  constructor(scheme?: string | Scheme) {
    super(scheme);
  }

  protected parse(scheme: string): string {
    return new SchemeValidator(scheme)
      .validated;
  }
}

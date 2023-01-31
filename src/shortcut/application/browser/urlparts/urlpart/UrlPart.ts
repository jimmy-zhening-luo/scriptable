abstract class UrlPart {
  readonly part: string;
  constructor(
    part: UrlPart
      | string = String()
  ) {
    this.part = part instanceof UrlPart ?
      this.parse(part.string)
      : this.parse(part);
  }

  get string(): string {
    return this.part;
  }

  toString(): string {
    return this.string;
  }

  protected abstract parse(part: string): string;
}

abstract class UrlPart {
  readonly part: string;
  constructor(
    part: UrlPart
      | string = ""
  ) {
    this.part = this.parse(part.toString());
  }

  get hasValue(): boolean {
    return this.part !== "";
  }

  get string(): string {
    return this.part;
  }

  toString(): string {
    return this.string;
  }

  protected abstract parse(part: string): string;
}

module.exports = UrlPart;

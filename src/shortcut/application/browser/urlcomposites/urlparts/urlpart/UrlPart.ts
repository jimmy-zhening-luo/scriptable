abstract class UrlPart {
  readonly part: string;
  constructor(
    part: UrlPart
      | string = ""
  ) {
    this.part = this.parse(part.toString());
  }

  protected abstract parse(part: string): string;

  get hasValue(): boolean {
    return this.part !== "";
  }

  get string(): string {
    return this.part;
  }

  toString(): string {
    return this.string;
  }
}

module.exports = UrlPart;

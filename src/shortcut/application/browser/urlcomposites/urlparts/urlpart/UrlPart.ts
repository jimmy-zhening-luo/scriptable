abstract class UrlPart {
  readonly part: null | string;
  constructor(
    part: UrlPart
      | string = ""
  ) {
    this.part = this.parse(part.toString());
  }

  protected abstract parse(part: string): null | string;

  get isValid(): boolean {
    return this.part !== null;
  }

  get string(): string {
    return this.part ?? "";
  }

  toString(): string {
    return this.string;
  }
}

module.exports = UrlPart;

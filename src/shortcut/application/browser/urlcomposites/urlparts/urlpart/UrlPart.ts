abstract class UrlPart {
  readonly value: null | string;
  readonly ClassDecorator_UrlPart: string = "UrlPart";
  constructor(
    part: UrlPart
      | string = ""
  ) {
    this.value = this.parse(part.toString());
  }

  protected abstract parse(part: string): null | string;

  get isValid(): boolean {
    return this.value !== null;
  }

  get string(): string {
    return this.value ?? "";
  }

  toString(): string {
    return this.string;
  }
}

module.exports = UrlPart;

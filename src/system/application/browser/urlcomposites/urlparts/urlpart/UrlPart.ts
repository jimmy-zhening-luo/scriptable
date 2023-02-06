abstract class UrlPart {
  readonly value: null | string;
  readonly ClassDecorator_UrlPart: string = "UrlPart";
  constructor(
    part?:
      null
      | string
      | UrlPart
  ) {
    this.value = (
      part === null
      || part === undefined
      || part.toString() === ""
    ) ?
      null
      : this.parse(part.toString());
    if (this.value === "")
      this.value = null;
  }

  protected abstract parse(part: string): null | string;

  get isValid(): boolean {
    return this.value !== null;
  }

  toString(): string {
    return this.value ?? "";
  }
}

module.exports = UrlPart;

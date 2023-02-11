abstract class UrlPart {

  readonly _nominalType: Types.stringful = "UrlPart";

  readonly value: null | string;

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

  static [Symbol.hasInstance](instance: any): boolean {
    return (
      instance !== null
      && instance !== undefined
      && typeof instance === "object"
      && "nominalType" in instance
      && instance.nominalType === "UrlPart"
    );
  }
}

module.exports = UrlPart;

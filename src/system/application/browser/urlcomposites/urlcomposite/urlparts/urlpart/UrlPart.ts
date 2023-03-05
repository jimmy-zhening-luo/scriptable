abstract class UrlPart {
  readonly _nominalType: string = "UrlPart";
  readonly value: null | string;

  constructor(part: string | UrlPart = "") {
    try {
      this.value = this.parse(part.toString());
      if (this.value === "") this.value = null;
    } catch (e) {
      throw new SyntaxError(
        `UrlPart: constructor: error creating UrlPart: ${e}`,
      );
    }
  }

  protected abstract parse(part: string): null | string;

  get isValid(): boolean {
    try {
      return this.value !== null;
    } catch (e) {
      throw new EvalError(
        `UrlPart: isValid: error checking if UrlPart is valid: ${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.value ?? "";
    } catch (e) {
      throw new Error(
        `UrlPart: toString: error converting UrlPart to string: ${e}`,
      );
    }
  }

  static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null &&
        instance !== undefined &&
        typeof instance === "object" &&
        "_nominalType" in instance &&
        (instance as UrlPart)._nominalType === "UrlPart"
      );
    } catch (e) {
      throw new EvalError(`UrlPart: error checking if object is UrlPart: ${e}`);
    }
  }

  protected get Repeaters(): typeof Repeaters {
    try {
      return UrlPart.Repeaters;
    } catch (e) {
      throw new ReferenceError(
        `UrlPart: error loading parent Repeaters module: ${e}`,
      );
    }
  }

  protected get UrlValidators(): typeof UrlValidators {
    try {
      return UrlPart.UrlValidators;
    } catch (e) {
      throw new ReferenceError(
        `UrlPart: error loading parent UrlValidators module: ${e}`,
      );
    }
  }

  protected static get Repeaters(): typeof Repeaters {
    try {
      return importModule("repeaters/Repeaters");
    } catch (e) {
      throw new ReferenceError(
        `UrlPart: error loading parent Repeaters module: ${e}`,
      );
    }
  }

  protected static get UrlValidators(): typeof UrlValidators {
    try {
      return UrlPart.Repeaters.UrlValidators;
    } catch (e) {
      throw new ReferenceError(
        `UrlPart: error loading parent UrlValidators module: ${e}`,
      );
    }
  }
}

module.exports = UrlPart;

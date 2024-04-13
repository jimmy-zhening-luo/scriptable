abstract class UrlPart {
  public readonly _nominalType: string = "UrlPart";
  public readonly value: null | string;

  constructor(part: string | UrlPart = "") {
    try {
      this.value = this.parse(part.toString());
      if (this.value === "") this.value = null;
    }
    catch (e) {
      throw new SyntaxError(
        `UrlPart: constructor: error creating UrlPart: \n${e as string}`,
      );
    }
  }

  public static get Repeaters(): typeof Repeaters {
    try {
      return importModule("repeaters/Repeaters") as typeof Repeaters;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlPart: error loading parent Repeaters module: \n${e as string}`,
      );
    }
  }

  public static get UrlValidators(): typeof UrlValidators {
    try {
      return UrlPart.Repeaters.UrlValidators;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlPart: error loading parent UrlValidators module: \n${e as string}`,
      );
    }
  }

  public get isValid(): boolean {
    try {
      return this.value !== null;
    }
    catch (e) {
      throw new EvalError(
        `UrlPart: isValid: error checking if UrlPart is valid: \n${e as string}`,
      );
    }
  }

  public static [Symbol.hasInstance](instance: any): boolean {
    try {
      return (
        instance !== null
        && instance !== undefined
        && typeof instance === "object"
        && "_nominalType" in instance
        && (instance as UrlPart)._nominalType === "UrlPart"
      );
    }
    catch (e) {
      throw new EvalError(
        `UrlPart: error checking if object is UrlPart: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.value ?? "";
    }
    catch (e) {
      throw new Error(
        `UrlPart: toString: error converting UrlPart to string: \n${e as string}`,
      );
    }
  }

  protected abstract parse(part: string): null | string;
}

module.exports = UrlPart;

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
        `UrlPart: constructor: error creating UrlPart`,
        { cause: e },
      );
    }
  }

  public static get Repeaters(): typeof Repeaters {
    try {
      return importModule("repeaters/Repeaters") as typeof Repeaters;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlPart: error loading parent Repeaters module`,
        { cause: e },
      );
    }
  }

  public static get UrlValidators(): typeof UrlValidators {
    try {
      return UrlPart.Repeaters.UrlValidators;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlPart: error loading parent UrlValidators module`,
        { cause: e },
      );
    }
  }

  public get isValid(): boolean {
    try {
      return this.value !== null;
    }
    catch (e) {
      throw new EvalError(
        `UrlPart: isValid: error checking if UrlPart is valid`,
        { cause: e },
      );
    }
  }

  public static [Symbol.hasInstance](instance: unknown): boolean {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && "_nominalType" in instance
        && (instance as UrlPart)._nominalType === "UrlPart"
      );
    }
    catch (e) {
      throw new EvalError(
        `UrlPart: error checking if object is UrlPart`,
        { cause: e },
      );
    }
  }

  public toString(): string {
    try {
      return this.value ?? "";
    }
    catch (e) {
      throw new Error(
        `UrlPart: toString: error converting UrlPart to string`,
        { cause: e },
      );
    }
  }

  protected abstract parse(part: string): null | string;
}

module.exports = UrlPart;

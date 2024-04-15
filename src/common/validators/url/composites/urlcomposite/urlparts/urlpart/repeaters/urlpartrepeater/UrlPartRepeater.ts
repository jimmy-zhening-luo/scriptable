abstract class UrlPartRepeater {
  public readonly value: null | string;

  constructor(repeater: null | string) {
    try {
      this.value
        = repeater === null || repeater === ""
          ? null
          : this.parse(repeater);
      if (this.value === "") this.value = null;
    }
    catch (e) {
      throw new Error(
        `UrlPartRepeater: constructor: error creating UrlPartRepeater: \n${e as string}`,
      );
    }
  }

  public static get UrlValidators(): typeof UrlValidators {
    try {
      return importModule("validators/UrlValidators") as typeof UrlValidators;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlPartRepeater: error loading parent UrlValidators module: \n${e as string}`,
      );
    }
  }

  public get isValid(): boolean {
    try {
      return this.value !== null;
    }
    catch (e) {
      throw new Error(
        `UrlPartRepeater: isValid: error checking if UrlPartRepeater is valid: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.value ?? "";
    }
    catch (e) {
      throw new Error(
        `UrlPartRepeater: toString: error converting UrlPartRepeater to string: \n${e as string}`,
      );
    }
  }

  protected abstract parse(repeater: string): null | string;
}

module.exports = UrlPartRepeater;

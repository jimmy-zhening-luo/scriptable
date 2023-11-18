abstract class UrlComposite {
  abstract readonly parts: Array<UrlPart | UrlComposite>;
  abstract get composite(): string;

  get isValid(): boolean {
    try {
      return this.composite !== "";
    }
    catch (e) {
      throw new Error(
        `UrlComposite: isValid: error checking validity of composite: \n${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.composite;
    }
    catch (e) {
      throw new Error(
        `UrlComposite: toString: error converting composite to string: \n${e}`,
      );
    }
  }

  static get UrlParts(): typeof UrlParts {
    try {
      return importModule("urlparts/UrlParts") as typeof UrlParts;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlComposite: error loading UrlParts module: \n${e}`,
      );
    }
  }
}

module.exports = UrlComposite;

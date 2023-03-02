abstract class UrlComposite {
  abstract readonly parts: Array<UrlPart | UrlComposite>;
  abstract get composite(): string;

  get isValid(): boolean {
    try {
      return this.composite !== "";
    } catch (e) {
      throw new Error(
        `UrlComposite: isValid: error checking validity of composite: ${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.composite;
    } catch (e) {
      throw new Error(
        `UrlComposite: toString: error converting composite to string: ${e}`,
      );
    }
  }

  static get UrlParts(): typeof UrlParts {
    try {
      return importModule("urlparts/UrlParts");
    } catch (e) {
      throw new ReferenceError(
        `UrlComposite: error loading UrlParts module: ${e}`,
      );
    }
  }
}

module.exports = UrlComposite;

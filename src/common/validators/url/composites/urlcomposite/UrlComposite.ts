abstract class UrlComposite {
  public abstract readonly parts: Array<UrlPart | UrlComposite>;

  public static get UrlParts(): typeof UrlParts {
    try {
      return importModule("urlparts/UrlParts") as typeof UrlParts;
    }
    catch (e) {
      throw new ReferenceError(
        `UrlComposite: error loading module: \n${e as string}`,
      );
    }
  }

  public get isValid(): boolean {
    try {
      return this.composite !== "";
    }
    catch (e) {
      throw new Error(
        `UrlComposite: isValid: error checking validity of composite: \n${e as string}`,
      );
    }
  }

  public abstract get composite(): string;

  public toString(): string {
    try {
      return this.composite;
    }
    catch (e) {
      throw new Error(
        `UrlComposite: toString: error converting composite to string: \n${e as string}`,
      );
    }
  }
}

module.exports = UrlComposite;

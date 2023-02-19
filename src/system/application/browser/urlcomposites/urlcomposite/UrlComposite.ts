abstract class UrlComposite {
  abstract readonly parts: Array<UrlPart|UrlComposite>;
  abstract get composite(): string;

  get isValid(): boolean {
    return this.composite !== "";
  }

  toString(): string {
    return this.composite;
  }

  static get UrlParts(): typeof UrlParts {
    return importModule("urlparts/UrlParts");
  }

}

module.exports = UrlComposite;

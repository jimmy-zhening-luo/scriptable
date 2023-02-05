abstract class UrlComposite {
  abstract readonly parts: Array<UrlPart|UrlComposite>;
  abstract get composite(): string;

  get isValid(): boolean {
    return this.composite !== "";
  }

  get string(): string {
    return this.composite;
  }

  toString(): string {
    return this.string;
  }
}

module.exports = UrlComposite;

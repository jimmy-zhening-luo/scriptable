abstract class UrlPartRepeater {
  readonly value: null | string;

  constructor(repeater?: null | string) {
    this.value =
      repeater === null || repeater === undefined || repeater === ""
        ? null
        : this.parse(repeater);
    if (this.value === "") this.value = null;
  }

  protected abstract parse(repeater: string): null | string;

  get isValid(): boolean {
    return this.value !== null;
  }

  toString(): string {
    return this.value ?? "";
  }

  protected get UrlValidators(): typeof UrlValidators {
    return UrlPartRepeater.UrlValidators;
  }

  static get UrlValidators(): typeof UrlValidators {
    return importModule("validators/UrlValidators");
  }
}

module.exports = UrlPartRepeater;

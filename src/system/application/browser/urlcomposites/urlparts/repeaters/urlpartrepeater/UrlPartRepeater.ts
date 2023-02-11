abstract class UrlPartRepeater {
  readonly value: null | string;
  constructor(
    repeater?: null | string
  ) {
    this.value = (
      repeater === null
      || repeater === undefined
      || repeater === ""
    ) ?
      null
      : this.parse(repeater);
    if (this.value === "")
      this.value = null;
  }

  protected abstract parse(repeater: string): null | string;

  get isValid(): boolean {
    return this.value !== null;
  }

  toString(): string {
    return this.value ?? "";
  }

  get Paths(): typeof Paths {
    return UrlPartRepeater.Paths;
  }

  static get Paths(): typeof Paths {
    return importModule("./system/application/common/paths/Paths")
  }
}

module.exports = UrlPartRepeater;

abstract class UrlPartRepeater {
  readonly value: null | string;
  constructor(
    repeater: string
  ) {
    this.value = this.parse(repeater);
  }

  protected abstract parse(repeater: string): null | string;

  get isValid(): boolean {
    return this.value !== null;
  }

  get string(): string {
    return this.value ?? "";
  }

  toString(): string {
    return this.string;
  }
}

module.exports = UrlPartRepeater;

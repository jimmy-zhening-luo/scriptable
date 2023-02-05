abstract class UrlPartRepeater {
  readonly repeater: null | string;
  constructor(
    repeater: string
  ) {
    this.repeater = this.parse(repeater);
  }

  protected abstract parse(repeater: string): null | string;

  get isValid(): boolean {
    return this.repeater !== null;
  }

  get string(): string {
    return this.repeater ?? "";
  }

  toString(): string {
    return this.string;
  }
}

module.exports = UrlPartRepeater;

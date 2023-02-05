abstract class UrlPartRepeater {
  readonly repeater: string;
  constructor(
    repeater: string
  ) {
    this.repeater = this.parse(repeater);
  }

  protected abstract parse(repeater: string): string;

  get string(): string {
    return this.repeater;
  }

  toString(): string {
    return this.string;
  }
}

module.exports = UrlPartRepeater;

class charset {
  constructor(
    public readonly filter: CharFilter,
    public readonly chars: readonly char[],
  ) {}

  public of<VS extends stringful>(string: string) {
    try {
      const { filter } = this;

      if (string.length < 1 || this[filter](string))
        return string as [VS] extends [stringful] ? VS : never;
      else
        throw new TypeError(`String has disallowed chars`);
    }
    catch (e) {
      throw new Error(
        `charset: allows`,
        { cause: e },
      );
    }
  }

  protected include(string: string) {
    try {
      const { chars } = this;

      return ([...string] as char[])
        .every(stringchar => chars.includes(stringchar));
    }
    catch (e) {
      throw new Error(
        `charset: include`,
        { cause: e },
      );
    }
  }

  protected exclude(string: string) {
    try {
      const { chars } = this;

      return chars
        .every(char => !string.includes(char));
    }
    catch (e) {
      throw new Error(
        `charset: exclude`,
        { cause: e },
      );
    }
  }
}

module.exports = charset;

class StringSplitter {

  readonly string: string;
  readonly separator: string;
  readonly ignoreEmptyTokens: boolean;
  readonly limit: number;
  readonly mergeTo: StringSplitter.Direction;

  readonly split: string[];
  readonly merged: string[];

  constructor(
    stringOrTokens: string | string[],
    separator: string = "",
    ignoreEmptyTokens: boolean = false,
    limit: number = Infinity,
    mergeTo: StringSplitter.Direction = StringSplitter.Direction.Right
  ) {
    this.string = Array.isArray(stringOrTokens) ?
      stringOrTokens.join(separator)
      : stringOrTokens;
    this.separator = separator;
    this.ignoreEmptyTokens = ignoreEmptyTokens;

    this.split = StringSplitter.split(
      this.string,
      this.separator,
      this.ignoreEmptyTokens
    );

    this.limit = new this.PositiveInteger(limit).value ?? new StringSplitter("").limit;
    this.mergeTo = mergeTo;
    this.merged = StringSplitter.merge(
      this.split,
      this.separator,
      this.ignoreEmptyTokens,
      this.limit,
      this.mergeTo,
    );
  }

  get splitLength(): number {
    return this.split.length;
  }

  get mergedLength(): number {
    return this.merged.length;
  }

  get length(): number {
    return this.mergedLength;
  }

  get didSplit(): boolean {
    return this.splitLength !== 0
      && this.splitLength !== 1;
  }

  get didMerge(): boolean {
    return this.mergedLength < this.splitLength;
  }

  static merge(
    tokens:
      ConstructorParameters<typeof StringSplitter>[0],
    separator:
      ConstructorParameters<typeof StringSplitter>[1]
      = "",
    ignoreEmptyTokens:
      ConstructorParameters<typeof StringSplitter>[2]
      = false,
    limit:
      ConstructorParameters<typeof StringSplitter>[3]
      = Infinity,
    mergeTo:
      ConstructorParameters<typeof StringSplitter>[4]
      = StringSplitter.Direction.Right
  ): string[] {
    return mergeTo === StringSplitter.Direction.Left ?
      StringSplitter.mergeLeft(
        tokens,
        separator,
        ignoreEmptyTokens,
        limit
      )
      : StringSplitter.mergeRight(
        tokens,
        separator,
        ignoreEmptyTokens,
        limit
      );
  }

  static mergeLeft(
    stringOrTokens:
      ConstructorParameters<typeof StringSplitter>[0],
    separator:
      ConstructorParameters<typeof StringSplitter>[1]
      = "",
    ignoreEmptyTokens:
      ConstructorParameters<typeof StringSplitter>[2]
      = false,
    limit:
      ConstructorParameters<typeof StringSplitter>[3]
      = Infinity,
  ): string[] {
    const tokens: string[] = StringSplitter.split(
      stringOrTokens,
      separator,
      ignoreEmptyTokens
    );
    return tokens.length === 0 ?
      []
      : [
        tokens.slice(0, limit - 1).join(separator),
        ...tokens.slice(limit - 1)
      ];
  }

  static mergeRight(
    stringOrTokens:
      ConstructorParameters<typeof StringSplitter>[0],
    separator:
      ConstructorParameters<typeof StringSplitter>[1]
      = "",
    ignoreEmptyTokens:
      ConstructorParameters<typeof StringSplitter>[2]
      = false,
    limit:
      ConstructorParameters<typeof StringSplitter>[3]
      = Infinity,
  ): string[] {
    const tokens: string[] = StringSplitter.split(
      stringOrTokens,
      separator,
      ignoreEmptyTokens
    );
    return tokens.length === 0 ?
      []
      : [
        ...tokens.slice(0, limit - 1),
        tokens.slice(limit - 1).join(separator)
      ];
  }

  static split(
    stringOrTokens:
      ConstructorParameters<typeof StringSplitter>[0],
    separator:
      ConstructorParameters<typeof StringSplitter>[1]
      = "",
    ignoreEmptyTokens:
      ConstructorParameters<typeof StringSplitter>[2]
      = false
  ): string[] {
    return StringSplitter
      .tokenize(
        stringOrTokens,
        separator
      ).filter(token =>
        !ignoreEmptyTokens || token !== ""
      );
  }

  static tokenize(
    stringOrTokens:
      ConstructorParameters<typeof StringSplitter>[0],
    separator:
      ConstructorParameters<typeof StringSplitter>[1]
      = ""
  ): string[] {
    return Array.isArray(stringOrTokens) ?
      stringOrTokens
      : stringOrTokens === "" ?
        []
        : separator === "" ?
          [...stringOrTokens]
          : stringOrTokens.split(separator);
  }

  private get PositiveInteger(): typeof PositiveInteger {
    return StringSplitter.PositiveInteger;
  }

  static get ValidString(): typeof ValidString {
    return importModule("ValidString");
  }

  static get PositiveInteger(): typeof PositiveInteger {
    return StringSplitter.ValidString.PositiveInteger;
  }

}

namespace StringSplitter {

  export const enum Direction {
    Left,
    Right
  }

}

module.exports = StringSplitter;

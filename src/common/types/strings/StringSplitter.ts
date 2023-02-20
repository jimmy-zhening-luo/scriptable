class StringSplitter {

  readonly string: string;
  readonly unmerged: string[];
  readonly merged: string[];

  constructor(
    stringOrTokens: Parameters<typeof StringSplitter.split>[0],
    separator: Parameters<typeof StringSplitter.split>[1] = "",
    splitOptions: Parameters<typeof StringSplitter.split>[2] = {},
    mergeOptions: Parameters<typeof StringSplitter.merge>[3] = {}
  ) {
    this.string = Array.isArray(stringOrTokens) ?
      stringOrTokens.join(separator)
      : stringOrTokens;
    this.unmerged = StringSplitter.split(
      this.string,
      separator,
      splitOptions
    );
    this.merged = StringSplitter.merge(
      this.unmerged,
      separator,
      splitOptions,
      mergeOptions
    );
  }

  get splitLength(): number {
    return this.unmerged.length;
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

  toString(): string {
    return this.string;
  }

  toTuple(): string[] {
    return this.merged;
  }

  static tokenize(
    stringOrTokens:
      | string
      | string[],
    separator: string = "",
  ): string[] {
    return Array.isArray(stringOrTokens) ?
      stringOrTokens
      : stringOrTokens === "" ?
        []
        : separator === "" ?
          [...stringOrTokens]
          : stringOrTokens.split(separator);
  }

  static aggregate(
    stringOrTokens: Parameters<typeof StringSplitter.tokenize>[0],
    separator: Parameters<typeof StringSplitter.tokenize>[1] = "",
  ) {
    return StringSplitter.tokenize(
      stringOrTokens,
      separator
    ).join(separator);
  }

  static split(
    stringOrTokens: Parameters<typeof StringSplitter.aggregate>[0],
    separator: Parameters<typeof StringSplitter.aggregate>[1] = "",
    {
      trim = false,
      trimTokens = false,
      ignoreEmptyTokens = false,
    }: {
      trim?: boolean,
      trimTokens?: boolean,
      ignoreEmptyTokens?: boolean
    }
  ): typeof StringSplitter.prototype.unmerged {
    return StringSplitter.tokenize(
      StringSplitter.aggregate(
        stringOrTokens,
        separator
      )[trim ? "trim" : "toString"](),
      separator
    ).map(token => trimTokens ?
      token.trim()
      : token
    ).filter(token => !ignoreEmptyTokens
      || token !== ""
    );
  }

  static merge(
    stringOrTokens: Parameters<typeof StringSplitter.split>[0],
    separator: Parameters<typeof StringSplitter.split>[1] = "",
    splitOptions: Parameters<typeof StringSplitter.split>[2] = {},
    {
      limit = Infinity,
      mergeTo = StringSplitter.Direction.Right
    }: {
      limit?: number,
      mergeTo?: StringSplitter.Direction
    }
  ): typeof StringSplitter.prototype.merged {
    limit = new StringSplitter.PositiveInteger(limit).value ?? Infinity;
    const tokens: string[] = StringSplitter.split(
      stringOrTokens,
      separator,
      splitOptions
    );
    return tokens.length === 0 ?
      []
      : limit === Infinity ?
        tokens
        : mergeTo === StringSplitter.Direction.Left ?
          [
            tokens.slice(0, limit - 1).join(separator),
            ...tokens.slice(limit - 1)
          ]
          : [
            ...tokens.slice(0, limit - 1),
            tokens.slice(limit - 1).join(separator)
          ];
  }

  static mergeLeft(
    stringOrTokens: Parameters<typeof StringSplitter.split>[0],
    separator: Parameters<typeof StringSplitter.split>[1] = "",
    splitOptions: Parameters<typeof StringSplitter.split>[2] = {},
    mergeOptions: Exclude<Parameters<typeof StringSplitter.merge>[3], "mergeTo">
  ): typeof StringSplitter.prototype.merged {
    return StringSplitter.merge(
      stringOrTokens,
      separator,
      splitOptions,
      {
        ...mergeOptions,
        mergeTo: StringSplitter.Direction.Left
      }
    );
  }

  static mergeRight(
    stringOrTokens: Parameters<typeof StringSplitter.split>[0],
    separator: Parameters<typeof StringSplitter.split>[1] = "",
    splitOptions: Parameters<typeof StringSplitter.split>[2] = {},
    mergeOptions: Exclude<Parameters<typeof StringSplitter.merge>[3], "mergeTo">
  ): typeof StringSplitter.prototype.merged {
    return StringSplitter.merge(
      stringOrTokens,
      separator,
      splitOptions,
      {
        ...mergeOptions,
        mergeTo: StringSplitter.Direction.Right
      }
    );
  }

  static get ValidString(): typeof ValidString {
    return importModule("ValidString");
  }

  static get PositiveInteger(): typeof PositiveInteger {
    return StringSplitter.ValidString.PositiveInteger;
  }

}

namespace StringSplitter {

  export enum Direction {
    Left,
    Right
  }

}

module.exports = StringSplitter;

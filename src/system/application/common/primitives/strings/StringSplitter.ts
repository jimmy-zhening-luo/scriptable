class StringSplitter {

  readonly text: string;
  readonly separator: string;
  readonly limit: number;
  readonly mergeTo: StringSplitter.Direction;
  readonly unmerged: string[];
  readonly merged: string[];

  constructor(
    text: string,
    separator: string = "",
    limit: number = Infinity,
    mergeTo: StringSplitter.Direction = StringSplitter.Direction.Right
  ) {
    this.text = text;
    this.separator = separator;
    this.limit = new this.PositiveInteger(limit).value ?? new StringSplitter("").limit;
    this.mergeTo = mergeTo;
    this.unmerged = StringSplitter.tokenize(
      this.text,
      this.separator
    );
    this.merged = StringSplitter.merge(
      this.unmerged,
      this.separator,
      this.limit,
      this.mergeTo
    );
  }

  get unmergedLength(): number {
    return this.unmerged.length;
  }

  get mergedLength(): number {
    return this.merged.length;
  }

  get didSplit(): boolean {
    return this.unmergedLength !== 0
      && this.unmergedLength !== 1;
  }

  get didMerge(): boolean {
    return this.mergedLength < this.unmergedLength;
  }

  static split(
    text: string,
    separator: string = "",
    limit: number = Infinity,
    mergeTo: StringSplitter.Direction = StringSplitter.Direction.Right
  ): string[] {
    return StringSplitter.merge(
      StringSplitter.split(
        text,
        separator
      ),
      separator,
      limit,
      mergeTo
    );
  }

  static merge(
    tokens: string[],
    separator: string = "",
    limit: number = Infinity,
    mergeTo: StringSplitter.Direction = StringSplitter.Direction.Right
  ): string[] {
    return tokens.length === 0 ?
      []
      : mergeTo === StringSplitter.Direction.Left ?
        StringSplitter.mergeLeft(tokens, separator, limit)
        : StringSplitter.mergeRight(tokens, separator, limit);
  }

  static mergeLeft(
    tokens: string[],
    separator: string = "",
    limit: number = Infinity,
  ): string[] {
    return [
      tokens.slice(0, limit - 1).join(separator),
      ...tokens.slice(limit - 1)
    ];
  }

  static mergeRight(
    tokens: string[],
    separator: string = "",
    limit: number = Infinity,
  ): string[] {
    return [
      ...tokens.slice(0, limit - 1),
      tokens.slice(limit - 1).join(separator)
    ];
  }

  static tokenize(
    text: string,
    separator: string = ""
  ): string[] {
    return text === "" ?
      []
      : separator === "" ?
        [...text]
        : text.split(separator);
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

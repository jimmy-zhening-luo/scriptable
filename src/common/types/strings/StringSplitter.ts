class StringSplitter {
  readonly string: string;
  readonly unmerged: string[];
  readonly merged: string[];

  constructor(
    stringOrTokens: Parameters<typeof StringSplitter.split>[0],
    separator: Parameters<typeof StringSplitter.split>[1] = "",
    splitOptions: Parameters<typeof StringSplitter.split>[2] = {},
    mergeOptions: Parameters<typeof StringSplitter.merge>[3] = {},
  ) {
    try {
      this.string = Array.isArray(stringOrTokens)
        ? stringOrTokens.join(separator)
        : stringOrTokens;
      this.unmerged = StringSplitter.split(
        this.string,
        separator,
        splitOptions,
      );
      this.merged = StringSplitter.merge(
        this.unmerged,
        separator,
        splitOptions,
        mergeOptions,
      );
    } catch (e) {
      throw new Error(
        `StringSplitter: constructor: Error creating StringSplitter object: ${e}`,
      );
    }
  }

  get splitLength(): number {
    try {
      return this.unmerged.length;
    } catch (e) {
      throw new EvalError(
        `StringSplitter: splitLength: Error getting split length: ${e}`,
      );
    }
  }

  get mergedLength(): number {
    try {
      return this.merged.length;
    } catch (e) {
      throw new EvalError(
        `StringSplitter: mergedLength: Error getting merged length: ${e}`,
      );
    }
  }

  get length(): typeof StringSplitter.prototype.mergedLength {
    try {
      return this.mergedLength;
    } catch (e) {
      throw new EvalError(`StringSplitter: length: Error getting length: ${e}`);
    }
  }

  get didSplit(): boolean {
    try {
      return this.splitLength !== 0 && this.splitLength !== 1;
    } catch (e) {
      throw new EvalError(
        `StringSplitter: didSplit: Error checking if split: ${e}`,
      );
    }
  }

  get didMerge(): boolean {
    try {
      return this.mergedLength < this.splitLength;
    } catch (e) {
      throw new EvalError(
        `StringSplitter: didMerge: Error checking if merge occurred during construction: ${e}`,
      );
    }
  }

  toString(): string {
    try {
      return this.string;
    } catch (e) {
      throw new EvalError(
        `StringSplitter: toString: Error converting to string: ${e}`,
      );
    }
  }

  toTuple(): string[] {
    try {
      return this.merged;
    } catch (e) {
      throw new EvalError(
        `StringSplitter: toTuple: Error converting to tuple: ${e}`,
      );
    }
  }

  static tokenize(
    stringOrTokens: string | string[],
    separator: string = "",
  ): string[] {
    try {
      return Array.isArray(stringOrTokens)
        ? stringOrTokens
        : stringOrTokens === ""
        ? []
        : separator === ""
        ? [...stringOrTokens]
        : stringOrTokens.split(separator);
    } catch (e) {
      throw new EvalError(
        `StringSplitter: tokenize: Error tokenizing string: ${e}`,
      );
    }
  }

  static aggregate(
    stringOrTokens: Parameters<typeof StringSplitter.tokenize>[0],
    separator: Parameters<typeof StringSplitter.tokenize>[1] = "",
  ): string {
    try {
      return StringSplitter.tokenize(stringOrTokens, separator).join(separator);
    } catch (e) {
      throw new EvalError(
        `StringSplitter: aggregate: Error aggregating tokens: ${e}`,
      );
    }
  }

  static split(
    stringOrTokens: Parameters<typeof StringSplitter.aggregate>[0],
    separator: Parameters<typeof StringSplitter.aggregate>[1] = "",
    {
      trim = false,
      trimTokens = false,
      ignoreEmptyTokens = false,
    }: {
      trim?: boolean;
      trimTokens?: boolean;
      ignoreEmptyTokens?: boolean;
    },
  ): typeof StringSplitter.prototype.unmerged {
    try {
      return StringSplitter.tokenize(
        StringSplitter.aggregate(stringOrTokens, separator)[
          trim ? "trim" : "toString"
        ](),
        separator,
      )
        .map(token => (trimTokens ? token.trim() : token))
        .filter(token => !ignoreEmptyTokens || token !== "");
    } catch (e) {
      throw new EvalError(
        `StringSplitter: split: Error splitting string: ${e}`,
      );
    }
  }

  static merge(
    stringOrTokens: Parameters<typeof StringSplitter.split>[0],
    separator: Parameters<typeof StringSplitter.split>[1] = "",
    splitOptions: Parameters<typeof StringSplitter.split>[2] = {},
    {
      limit = Infinity,
      mergeTo = StringSplitter.Direction.Right,
    }: {
      limit?: number;
      mergeTo?: StringSplitter.Direction;
    },
  ): typeof StringSplitter.prototype.merged {
    try {
      limit = new StringSplitter.PositiveInteger(limit).value ?? Infinity;
      const tokens: string[] = StringSplitter.split(
        stringOrTokens,
        separator,
        splitOptions,
      );
      return tokens.length === 0
        ? []
        : limit === Infinity
        ? tokens
        : mergeTo === StringSplitter.Direction.Left
        ? [
            tokens.slice(0, limit - 1).join(separator),
            ...tokens.slice(limit - 1),
          ]
        : [
            ...tokens.slice(0, limit - 1),
            tokens.slice(limit - 1).join(separator),
          ];
    } catch (e) {
      throw new EvalError(`StringSplitter: merge: Error merging tokens: ${e}`);
    }
  }

  static mergeLeft(
    stringOrTokens: Parameters<typeof StringSplitter.split>[0],
    separator: Parameters<typeof StringSplitter.split>[1] = "",
    splitOptions: Parameters<typeof StringSplitter.split>[2] = {},
    mergeOptions: Exclude<
      Parameters<typeof StringSplitter.merge>[3],
      "mergeTo"
    >,
  ): typeof StringSplitter.prototype.merged {
    try {
      return StringSplitter.merge(stringOrTokens, separator, splitOptions, {
        ...mergeOptions,
        mergeTo: StringSplitter.Direction.Left,
      });
    } catch (e) {
      throw new EvalError(
        `StringSplitter: mergeLeft: Error merging tokens to the left: ${e}`,
      );
    }
  }

  static mergeRight(
    stringOrTokens: Parameters<typeof StringSplitter.split>[0],
    separator: Parameters<typeof StringSplitter.split>[1] = "",
    splitOptions: Parameters<typeof StringSplitter.split>[2] = {},
    mergeOptions: Exclude<
      Parameters<typeof StringSplitter.merge>[3],
      "mergeTo"
    >,
  ): typeof StringSplitter.prototype.merged {
    try {
      return StringSplitter.merge(stringOrTokens, separator, splitOptions, {
        ...mergeOptions,
        mergeTo: StringSplitter.Direction.Right,
      });
    } catch (e) {
      throw new EvalError(
        `StringSplitter: mergeRight: Error merging tokens to the right: ${e}`,
      );
    }
  }

  static get PositiveInteger(): typeof PositiveInteger {
    try {
      return importModule("./common/types/numbers/PositiveInteger");
    } catch (e) {
      throw new ReferenceError(
        `StringSplitter: error importing PositiveInteger module: ${e}`,
      );
    }
  }
}

namespace StringSplitter {
  export enum Direction {
    Left,
    Right,
  }
}

module.exports = StringSplitter;

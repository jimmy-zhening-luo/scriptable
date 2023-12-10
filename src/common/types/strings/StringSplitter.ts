class StringSplitter {
  public readonly separator: string;
  private readonly _merged: string[];

  constructor(
    stringOrTokens: Parameters<typeof StringSplitter._split>[0],
    separator: Parameters<typeof StringSplitter._split>[1] = "",
    splitOptions: Parameters<typeof StringSplitter._split>[2] = {},
    mergeOptions: Parameters<typeof StringSplitter._merge>[3] = {},
  ) {
    try {
      this.separator = separator;
      this._merged = StringSplitter._merge(
        stringOrTokens,
        this.separator,
        splitOptions,
        mergeOptions,
      );
    }
    catch (e) {
      throw new Error(
        `StringSplitter: constructor: Error creating StringSplitter object: \n${e as string}`,
      );
    }
  }

  public static get PositiveInteger(): typeof PositiveInteger {
    try {
      return importModule(
        "./common/types/numbers/PositiveInteger",
      ) as typeof PositiveInteger;
    }
    catch (e) {
      throw new ReferenceError(
        `StringSplitter: error importing PositiveInteger module: \n${e as string}`,
      );
    }
  }

  public get numTokens(): number {
    try {
      return this.separator === ""
        ? this.toString().length
        : this.toString()
          .split(this.separator).length;
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: numTokens: Error getting number of raw tokens: \n${e as string}`,
      );
    }
  }

  public get length(): number {
    try {
      return this.toTuple().length;
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: length: Error getting length of merged array: \n${e as string}`,
      );
    }
  }

  public get wasMerged(): boolean {
    try {
      return this.length < this.numTokens;
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: didMerge: Error checking if merge occurred during construction: \n${e as string}`,
      );
    }
  }

  private static _merge(
    stringOrTokens: Parameters<typeof StringSplitter._split>[0],
    separator: Parameters<typeof StringSplitter._split>[1] = "",
    splitOptions: Parameters<typeof StringSplitter._split>[2] = {},
    {
      limit = Infinity,
      mergeTo = StringSplitter.Direction.Right,
    }: {
      limit?: number;
      mergeTo?: StringSplitter.Direction;
    },
  ): string[] {
    try {
      limit = new StringSplitter.PositiveInteger(limit).value ?? Infinity;
      const tokens: string[] = StringSplitter._split(
        stringOrTokens,
        separator,
        splitOptions,
      );

      if (tokens.length === 0) return [];
      else {
        if (limit === Infinity) return tokens;
        else {
          if (mergeTo === StringSplitter.Direction.Left)
            return [
              tokens.slice(0, limit - 1)
                .join(separator),
              ...tokens.slice(limit - 1),
            ];
          else
            return [
              ...tokens.slice(0, limit - 1),
              tokens.slice(limit - 1)
                .join(separator),
            ];
        }
      }
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: merge: Error merging tokens: \n${e as string}`,
      );
    }
  }

  private static _split(
    stringOrTokens: Parameters<typeof StringSplitter.__aggregate>[0],
    separator: Parameters<typeof StringSplitter.__aggregate>[1] = "",
    {
      trim = false,
      trimTokens = false,
      ignoreEmptyTokens = false,
    }: {
      trim?: boolean;
      trimTokens?: boolean;
      ignoreEmptyTokens?: boolean;
    },
  ): string[] {
    try {
      return StringSplitter.__tokenize(
        StringSplitter.__aggregate(stringOrTokens, separator)[
          trim
            ? "trim"
            : "toString"
        ](),
        separator,
      )
        .map(token => trimTokens
          ? token.trim()
          : token)
        .filter(token => !ignoreEmptyTokens || token !== "");
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: split: Error splitting string: \n${e as string}`,
      );
    }
  }

  private static __aggregate(
    stringOrTokens: Parameters<typeof StringSplitter.__tokenize>[0],
    separator: Parameters<typeof StringSplitter.__tokenize>[1] = "",
  ): string {
    try {
      return StringSplitter.__tokenize(stringOrTokens, separator)
        .join(
          separator,
        );
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: aggregate: Error aggregating tokens: \n${e as string}`,
      );
    }
  }

  private static __tokenize(
    stringOrTokens: string | string[],
    separator: string = "",
  ): string[] {
    try {
      if (typeof stringOrTokens === "string") {
        if (stringOrTokens === "") return [];
        else {
          if (separator === "") return [...stringOrTokens];
          else return stringOrTokens.split(separator);
        }
      }
      else return [...stringOrTokens];
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: tokenize: Error tokenizing string: \n${e as string}`,
      );
    }
  }

  public toTuple(): string[] {
    try {
      return [...this._merged];
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: toTuple: Error converting to tuple: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.toTuple()
        .join(this.separator);
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: toString: Error converting to string: \n${e as string}`,
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

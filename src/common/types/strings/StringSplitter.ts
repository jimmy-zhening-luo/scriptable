class StringSplitter {
  public readonly separator: string;
  public readonly merged: string[];

  constructor(
    unmerged: string | string[],
    separator: string = "",
    splitOptions: Parameters<typeof StringSplitter.mergeSplit>[2] = {},
    mergeOptions: Parameters<typeof StringSplitter.mergeSplit>[3] = {},
  ) {
    try {
      this.separator = separator;
      this.merged = StringSplitter.mergeSplit(
        this.unmerged,
        this.separator,
        splitOptions,
        mergeOptions,
      );
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: ctor: \n${e as string}`,
      );
    }
  }

  public get length(): number {
    try {
      return this.merged.length;
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: length: \n${e as string}`,
      );
    }
  }

  private static mergeSplit(
    unmerged: Parameters<typeof StringSplitter._split>[0],
    separator: Parameters<typeof StringSplitter._split>[1],
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
      limit = !Number.isInteger(limit) || limit < 0
        ? Infinity
        : limit;

      const tokens: string[] = StringSplitter._split(
        unmerged,
        separator,
        splitOptions,
      );

      return mergeTo === StringSplitter.Direction.Left
        ? [
          tokens
            .slice(0, limit - 1)
            .join(separator),
          ...tokens.slice(limit - 1),
        ]
        : [
          ...tokens.slice(0, limit - 1),
          tokens
            .slice(limit - 1)
            .join(separator),
        ];
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: mergeSplit: \n${e as string}`,
      );
    }
  }

  private static _split(
    raw: string | string[],
    separator: string,
    {
      trim = false,
      trimTokens = false,
      noEmptyTokens = false,
    }: {
      trim?: boolean;
      trimTokens?: boolean;
      noEmptyTokens?: boolean;
    },
  ): string[] {
    try {
      const trimmed: string = [raw]
        .flat()
        .join(separator)[
          trim
            ? "trim"
            : "toString"
        ];
      return trimmed === ""
        ? []
        : trimmed
          .split(separator)
          .map(token =>
            trimTokens
              ? token.trim()
              : token)
          .filter(token =>
            !noEmptyTokens || token !== "");
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: _split: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.merged.join(this.separator);
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: toString: \n${e as string}`,
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

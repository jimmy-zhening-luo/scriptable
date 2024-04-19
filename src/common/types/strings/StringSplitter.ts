class StringSplitter {
  public readonly separator: string;
  public readonly merged: string[];

  constructor(
    unmerged: string | string[],
    separator: string = "",
    splitOptions: Parameters<typeof StringSplitter._mergeSplit>[2] = {},
    mergeOptions: Parameters<typeof StringSplitter._mergeSplit>[3] = {},
  ) {
    try {
      this.separator = separator;
      this.merged = StringSplitter._mergeSplit(
        unmerged,
        separator,
        splitOptions,
        mergeOptions,
      );
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: ctor`,
        { cause: e },
      );
    }
  }

  public get length(): number {
    try {
      return this.merged.length;
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: length`,
        { cause: e },
      );
    }
  }

  private static _mergeSplit(
    unmerged: string | string[],
    separator: string,
    splitOptions: Parameters<typeof StringSplitter.__split>[2] = {},
    {
      limit = Infinity,
      mergeTo = "right",
    }: {
      limit?: number;
      mergeTo?: "left" | "right";
    },
  ): string[] {
    try {
      limit = !Number.isInteger(limit) || limit < 0
        ? Infinity
        : limit;

      const tokens: string[] = StringSplitter.__split(
        unmerged,
        separator,
        splitOptions,
      );

      return tokens.length === 0
        ? []
        : tokens.length <= limit
          ? tokens
          : mergeTo === "left"
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
        `StringSplitter: _mergeSplit`,
        { cause: e },
      );
    }
  }

  private static __split(
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
      const trimmed: string = (
        typeof raw === "string"
          ? raw
          : raw.join(separator)
      )[
        trim
          ? "trim"
          : "toString"
      ]();

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
        `StringSplitter: __split`,
        { cause: e },
      );
    }
  }

  public toString(): string {
    try {
      return this.merged.join(this.separator);
    }
    catch (e) {
      throw new EvalError(
        `StringSplitter: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = StringSplitter;

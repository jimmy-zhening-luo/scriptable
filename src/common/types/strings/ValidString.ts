class ValidString<Brand extends string> {
  public readonly string: CharStringful<Brand>["string"];

  constructor(
    input: string,
    {
      min = 1,
      max = Infinity,
      negate = false,
      chars = [],
    }: {
      min?: number;
      max?: number;
      negate?: boolean;
      chars?: Array<
        ConstructorParameters<typeof CharSet>[1]
      >;
    } = {},
    cleanOptions: Parameters<typeof ValidString.clean>[1] = {},
  ) {
    try {
      this.string = new ValidString
        .CharStringful<Brand>(
        min,
        max,
        ValidString
          .clean(
            input,
            cleanOptions,
          ),
        negate,
        ...chars,
      ).string;
    }
    catch (e) {
      throw new EvalError(
        `ValidString: ctor`,
        { cause: e },
      );
    }
  }

  public static get CharSet(): typeof CharSet {
    try {
      return ValidString.CharStringful.CharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidString: import CharStringful.CharSet`,
        { cause: e },
      );
    }
  }

  private static get CharStringful(): typeof CharStringful {
    try {
      return importModule("charstrings/CharStringful") as typeof CharStringful;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidString: import CharStringful`,
        { cause: e },
      );
    }
  }

  private static clean(
    raw: string,
    {
      toLower = false,
      trim = false,
      trimLeadingExcept = false,
      trimTrailingExcept = false,
      trimLeading = [],
      trimTrailing = [],
    }: {
      toLower?: boolean;
      trim?: boolean;
      trimLeadingExcept?: boolean;
      trimTrailingExcept?: boolean;
      trimLeading?: string[];
      trimTrailing?: string[];
    },
  ): string {
    try {
      if (toLower)
        raw = raw.toLowerCase();

      if (trim)
        raw = raw.trim();

      return ValidString._trimEdge(
        ValidString._trimEdge(
          raw,
          "leading",
          trimLeading,
          trimLeadingExcept,
        ),
        "trailing",
        trimTrailing,
        trimTrailingExcept,
      );
    }
    catch (e) {
      throw new EvalError(
        `ValidString: clean`,
        { cause: e },
      );
    }
  }

  private static _trimEdge(
    string: string,
    edge: "leading" | "trailing",
    wordsToTrim: string[],
    trimExcept: boolean,
  ): string {
    try {
      const lookFn:
        | "startsWith"
        | "endsWith" = edge === "leading"
          ? "startsWith"
          : "endsWith";

      wordsToTrim
        .filter(word =>
          word !== "")
        .forEach(word => {
          while (
            string[lookFn](word) !== trimExcept
          )
            string = lookFn === "startsWith"
              ? string.slice(
                trimExcept
                  ? 1
                  : word.length,
              )
              : string.slice(
                0,
                0 - (
                  trimExcept
                    ? 1
                    : word.length
                ),
              );
        });

      return string;
    }
    catch (e) {
      throw new EvalError(
        `ValidString: _trimEdge`,
        { cause: e },
      );
    }
  }

  public toString(): ValidString<Brand>["string"] {
    try {
      return this.string;
    }
    catch (e) {
      throw new EvalError(
        `ValidString: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = ValidString;

const boundString = importModule(
  `bound/BoundString`,
) as typeof BoundString;

class CleanString<Validator extends string> extends boundString<stringful, [Validator, `Clean`]> {
  constructor(
    string: string,
    charset: char[],
    {
      filter = "exclude",
      min = 1 as Positive<fint>,
      max = Infinity as Positive<int>,
    }: {
      filter?: Filter;
      min?: Positive<fint>;
      max?: Positive<int>;
    } = {},
    cleanOptions: Parameters<typeof CleanString.clean>[1] = {},
  ) {
    try {
      super(
        CleanString.clean(
          string,
          cleanOptions,
        ),
        charset,
        filter,
        min,
        max,
      );
    }
    catch (e) {
      throw new EvalError(
        `CleanString: ctor`,
        { cause: e },
      );
    }
  }

  private static clean(
    string: string,
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
      trimLeading?: readonly stringful[];
      trimTrailing?: readonly stringful[];
    },
  ) {
    try {
      return this.trimEdge(
        this.trimEdge(
          string[
            toLower
              ? "toLowerCase"
              : "toString"
          ]()[
            trim
              ? "trim"
              : "toString"
          ](),
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
        `CleanString: clean`,
        { cause: e },
      );
    }
  }

  private static trimEdge(
    string: string,
    edge:
      | "leading"
      | "trailing",
    wordsToTrim: readonly stringful[],
    trimExcept: boolean,
  ) {
    try {
      let trimmed = string;
      const lookFn = edge === "leading"
        ? "startsWith"
        : "endsWith";
      const slicer = edge === "leading"
        ? trimExcept
          ? () =>
              [1]
          : (word: string) =>
              [word.length]
        : trimExcept
          ? () =>
              [
                0,
                -1,
              ]
          : (word: string) =>
              [
                0,
                0 - word.length,
              ];

      wordsToTrim
        .forEach(
          word => {
            while (trimExcept !== trimmed[lookFn](word))
              trimmed = trimmed.slice(...slicer(word));
          },
        );

      return trimmed;
    }
    catch (e) {
      throw new EvalError(
        `CleanString: trimEdge`,
        { cause: e },
      );
    }
  }
}

module.exports = CleanString;

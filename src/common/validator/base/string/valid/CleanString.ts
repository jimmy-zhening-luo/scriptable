const v_BoundString = importModule(
  `bound/BoundString`,
) as typeof BoundString;

class CleanString<
  Validator extends string[],
> extends v_BoundString<
    stringful
    ,
    [
      ...Validator,
      `Clean`,
    ]
  > {
  constructor(
    string: string,
    chars: char[],
    negate: boolean = false,
    max: Positive<int> = Infinity as Positive<int>,
    min: Positive<fint> = 1 as Positive<fint>,
    cleanOptions: Parameters<typeof CleanString.clean>[1] = {},
  ) {
    try {
      super(
        CleanString
          .clean(
            string,
            cleanOptions,
          ),
        chars,
        negate,
        max,
        min,
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
      trimLeading?: readonly string[];
      trimTrailing?: readonly string[];
    },
  ) {
    try {
      return this
        .trimEdge(
          this
            .trimEdge(
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
    wordsToTrim: readonly string[],
    trimExcept: boolean,
  ) {
    try {
      let trimmed = string;
      const lookFn = edge === "leading"
        ? "startsWith"
        : "endsWith";

      wordsToTrim
        .filter(
          (word): word is stringful =>
            word
              .length > 0,
        )
        .forEach(
          word => {
            while (
              trimExcept !== trimmed[
                lookFn
              ](
                word,
              )
            )
              trimmed = lookFn === "startsWith"
                ? trimmed
                  .slice(
                    trimExcept
                      ? 1
                      : word
                        .length,
                  )
                : trimmed
                  .slice(
                    0,
                    0 - (
                      trimExcept
                        ? 1
                        : word
                          .length
                    ),
                  );
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

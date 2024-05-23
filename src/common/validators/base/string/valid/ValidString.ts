const v_BoundString = importModule(
  "bound/BoundString",
) as typeof BoundString;

class ValidString<
  V extends string,
> extends v_BoundString<
    stringful,
    `Valid:${
      literalful<V>
    }`
  > {
  constructor(
    string: string,
    chars: UnflatArray<
      char
    >,
    min: posint = 1 as posint,
    max: posinfinint = Infinity as posinfinint,
    negate: boolean = false,
    cleanOptions: Parameters<ValidString<V, T>["clean"]>[1] = {},
  ) {
    try {
      super(
        min,
        max,
        ValidString
          .clean(
            string,
            cleanOptions,
          ),
        negate,
        ...chars,
      )
    }
    catch (e) {
      throw new EvalError(
        `ValidString: ctor`,
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
      trimLeading?: string[];
      trimTrailing?: string[];
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
        `ValidString: clean`,
        { cause: e },
      );
    }
  }

  private static trimEdge(
    string: string,
    edge:
      | "leading"
      | "trailing",
    wordsToTrim: string[],
    trimExcept: boolean,
  ) {
    try {
      let trimmed = string;
      const lookFn =
        edge === "leading"
          ? "startsWith"
          : "endsWith";

      wordsToTrim
        .filter(
          (word): word is stringful =>
            word.length > 0,
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
        `ValidString: trimEdge`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      return this
        .string;
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

class ValidString<
  T extends stringful,
  V extends string,
> {
  public readonly string: BoundString<
    T,
    `Valid:${
      literalful<V>
    }`
  >["string"];

  constructor(
    input: string,
    chars: Array<
      ConstructorParameters<typeof CharSet>[1]
    >,
    min = 1,
    max = Infinity,
    negate = false,
    cleanOptions: Parameters<ValidString<T, string>["clean"]>[1] = {},
  ) {
    try {
      this.string = new this
        .BoundString<
        T,
         `Valid:${literalful<V>}`
      >(
        min,
        max,
        this
          .clean(
            input,
            cleanOptions,
          ),
        negate,
        ...chars,
      )
        .string;
    }
    catch (e) {
      throw new EvalError(
        `ValidString: ctor`,
        { cause: e },
      );
    }
  }

  public static get CharSet() {
    try {
      return importModule(
        "bound/charstring/charset/CharSet",
      ) as typeof CharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidString: import CharSet`,
        { cause: e },
      );
    }
  }

  private get BoundString() {
    try {
      return importModule(
        "bound/BoundString",
      ) as typeof BoundString;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidString: import BoundString`,
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

  private clean(
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
  ) {
    try {
      return this
        ._trimEdge(
          this
            ._trimEdge(
              raw[
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

  private _trimEdge(
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
        `ValidString: _trimEdge`,
        { cause: e },
      );
    }
  }
}

module.exports = ValidString;

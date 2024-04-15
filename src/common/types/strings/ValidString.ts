class ValidString {
  public readonly cleaned: string;
  private readonly _charString: BoundedRepeatCharString;

  constructor(
    candidate: string,
    {
      min = 0,
      max = Infinity,
      negate = false,
      allowedChars = [],
    }: {
      min?: number;
      max?: number;
      negate?: boolean;
      allowedChars?: Array<
        ConstructorParameters<typeof BoundedRepeatCharString>[4]
      >;
    } = {},
    cleanOptions: Parameters<typeof ValidString._clean>[1] = {},
  ) {
    try {
      this.cleaned = ValidString
        ._clean(
          candidate,
          cleanOptions,
        );
      this._charString = new ValidString
        .BoundedRepeatCharString(
          min,
          max,
          this.cleaned,
          negate,
          ...allowedChars,
        );
    }
    catch (e) {
      throw new EvalError(
        `ValidString: ctor: \n${e as string}`,
      );
    }
  }

  public static get BoundedRepeatCharString(): typeof BoundedRepeatCharString {
    try {
      return importModule(
        "charstrings/BoundedRepeatCharString",
      ) as typeof BoundedRepeatCharString;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidString: import BoundedRepeatCharString: \n${e as string}`,
      );
    }
  }

  public static get CharSet(): typeof CharSet {
    try {
      return ValidString.BoundedRepeatCharString.CharSet;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidString: import BoundedRepeatCharString.CharSet: \n${e as string}`,
      );
    }
  }

  public get value(): string {
    return this._charString.value;
  }

  public get min(): number {
    try {
      return this._charString.min;
    }
    catch (e) {
      throw new EvalError(
        `ValidString: min: \n${e as string}`,
      );
    }
  }

  public get max(): number {
    try {
      return this._charString.max;
    }
    catch (e) {
      throw new EvalError(
        `ValidString: max: \n${e as string}`,
      );
    }
  }

  private static _clean(
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

      return ValidString.__trimEdge(
        ValidString.__trimEdge(
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
        `ValidString: _clean: \n${e as string}`,
      );
    }
  }

  private static __trimEdge(
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
        `ValidString: __trimEdge: \n${e as string}`,
      );
    }
  }

  public toString(): string {
    try {
      return this.value;
    }
    catch (e) {
      throw new EvalError(
        `ValidString: toString: \n${e as string}`,
      );
    }
  }
}

module.exports = ValidString;

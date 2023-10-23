class ValidString {
  readonly cleaned: string;
  private readonly _boundedRepeatCharString: BoundedRepeatCharString;
  constructor(
    candidateString: string = "",
    {
      min = 0,
      max = Infinity,
      negate = false,
      allowedChars = [],
    }: {
      min?: number;
      max?: number;
      negate?: boolean;
      allowedChars?: ConstructorParameters<typeof BoundedRepeatCharString>[4][];
    } = {},
    cleanOptions: Parameters<typeof ValidString._clean>[1] = {},
  ) {
    try {
      this.cleaned = ValidString._clean(candidateString, cleanOptions);
      this._boundedRepeatCharString = new ValidString.BoundedRepeatCharString(
        min,
        max,
        this.cleaned,
        negate,
        ...allowedChars,
      );
    } catch (e) {
      throw new Error(
        `ValidString: constructor: Error creating ValidString object: \n${e}`,
      );
    }
  }

  get value(): typeof BoundedRepeatCharString.prototype.value {
    return this._boundedRepeatCharString.value;
  }

  get isValid(): boolean {
    try {
      return this.value !== null;
    } catch (e) {
      throw new EvalError(
        `ValidString: isValid: Error getting validity: \n${e}`,
      );
    }
  }

  get min(): number {
    try {
      return this._boundedRepeatCharString.min;
    } catch (e) {
      throw new EvalError(`ValidString: min: Error getting min: \n${e}`);
    }
  }

  get max(): number {
    try {
      return this._boundedRepeatCharString.max;
    } catch (e) {
      throw new EvalError(`ValidString: max: Error getting max: \n${e}`);
    }
  }

  toString(): string {
    try {
      return this.value ?? "";
    } catch (e) {
      throw new EvalError(
        `ValidString: toString: Error converting to string: \n${e}`,
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
  ): typeof ValidString.prototype.cleaned {
    try {
      if (toLower) raw = raw.toLowerCase();
      if (trim) raw = raw.trim();
      const preprocessed: string = raw;
      return ValidString._trimEdge(
        ValidString._trimEdge(
          preprocessed,
          trimLeading,
          ValidString.Edge.Leading,
          trimLeadingExcept,
        ),
        trimTrailing,
        ValidString.Edge.Trailing,
        trimTrailingExcept,
      );
    } catch (e) {
      throw new EvalError(`ValidString: clean: Error cleaning string: \n${e}`);
    }
  }

  private static _trimEdge(
    string: string,
    wordsToTrim: string[] = [],
    edge: ValidString.Edge,
    trimExcept: boolean = false,
  ): string {
    try {
      const isLeading: boolean = edge === ValidString.Edge.Leading;
      type LookPrototypeFunction = "startsWith" | "endsWith";
      const lookFn: LookPrototypeFunction = isLeading
        ? "startsWith"
        : "endsWith";
      const lookCondition: boolean = !trimExcept;
      wordsToTrim
        .filter(word => word !== "")
        .forEach(word => {
          while (string[lookFn](word) === lookCondition)
            string = isLeading
              ? string.slice(trimExcept ? 1 : word.length)
              : string.slice(0, 0 - (trimExcept ? 1 : word.length));
        });
      return string;
    } catch (e) {
      throw new EvalError(`ValidString: trimEdge: Error trimming edge: \n${e}`);
    }
  }

  static get BoundedRepeatCharString(): typeof BoundedRepeatCharString {
    try {
      return importModule(
        "charstrings/BoundedRepeatCharString",
      ) as typeof BoundedRepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing BoundedRepeatCharString module: \n${e}`,
      );
    }
  }

  static get CharSets(): typeof CharSets {
    try {
      return ValidString.BoundedRepeatCharString.CharSets;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing CharSets module: \n${e}`,
      );
    }
  }

  static get CharSet(): typeof CharSet {
    try {
      return ValidString.CharSets.CharSet;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing CharSet module: \n${e}`,
      );
    }
  }

  static get UrlCharSet(): typeof UrlCharSet {
    try {
      return ValidString.CharSets.UrlCharSet;
    } catch (e) {
      throw new ReferenceError(
        `ValidString: error importing UrlCharSet module: \n${e}`,
      );
    }
  }
}

namespace ValidString {
  export enum Edge {
    Leading,
    Trailing,
  }
}

module.exports = ValidString;

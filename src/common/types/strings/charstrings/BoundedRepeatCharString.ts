const _RepeatCharString: typeof RepeatCharString = importModule(
  "repeatcharstring/RepeatCharString",
) as typeof RepeatCharString;

class BoundedRepeatCharString extends _RepeatCharString {
  public readonly min: number;
  public readonly max: number;

  constructor(
    min: number = 0,
    max: number = Infinity,
    ...charStringParams: ConstructorParameters<
      typeof RepeatCharString
    >
  ) {
    try {
      super(...charStringParams);
      for (const n of [
        min,
        max,
      ]) {
        if (!Number.isInteger(n) && n !== Infinity || n < 0)
          throw RangeError(
            `the value ${n} of min ${min} or max ${max} is not a valid positive integer`,
          );
      }

      if (min > max) {
        const swap: number = min;

        min = max;
        max = swap;
      }

      if (min === Infinity)
        min = max = 0;

      this.min = min;
      this.max = max;
    }
    catch (e) {
      throw new EvalError(
        `BoundedRepeatCharString: ctor`,
        { cause: e },
      );
    }
  }

  public static get RepeatCharString(): typeof RepeatCharString {
    try {
      return _RepeatCharString;
    }
    catch (e) {
      throw new ReferenceError(
        `BoundedRepeatCharString: import RepeatCharString`,
        { cause: e },
      );
    }
  }

  protected override _qualifies(candidate: string): boolean {
    try {
      return (
        candidate.length <= this.max
        && candidate.length >= this.min
        && super._qualifies(candidate)
      );
    }
    catch (e) {
      throw new EvalError(
        `BoundedRepeatCharString: _qualifies`,
        { cause: e },
      );
    }
  }
}

module.exports = BoundedRepeatCharString;

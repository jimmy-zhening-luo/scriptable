const _RepeatCharString: typeof RepeatCharString = importModule(
  "repeatcharstring/RepeatCharString",
) as typeof RepeatCharString;

class BoundedRepeatCharString extends _RepeatCharString {
  public readonly min: number;
  public readonly max: number;

  constructor(
    min: number = 0,
    max: number = Infinity,
    ...repeatCharStringCtorParams: ConstructorParameters<
      typeof RepeatCharString
    >
  ) {
    try {
      super(...repeatCharStringCtorParams);
      for (const n of [
        min,
        max,
      ]) {
        if (!Number.isInteger(n) && n !== Infinity || n < 0)
          throw SyntaxError(
            `the value ${bound} of min ${min} or max ${max} is not a valid positive integer`,
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
        `BoundedRepeatCharString: constructor: Error creating BoundedRepeatCharString object: \n${e as string}`,
      );
    }
  }

  public static get RepeatCharString(): typeof RepeatCharString {
    try {
      return _RepeatCharString;
    }
    catch (e) {
      throw new ReferenceError(
        `BoundedRepeatCharString: RepeatCharString: Error importing RepeatCharString module: \n${e as string}`,
      );
    }
  }

  protected override _qualifies(candidate: string): boolean {
    try {
      return (
        candidate.length <= this.max
        && candidate.length >= this.min
        && super._qualifies(candidate);
      );
    }
    catch (e) {
      throw new EvalError(
        `BoundedRepeatCharString: _qualifies: Error calling _qualifies: \n${e as string}`,
      );
    }
  }
}

module.exports = BoundedRepeatCharString;

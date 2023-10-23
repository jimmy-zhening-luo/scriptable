const _RepeatCharString: typeof RepeatCharString = importModule(
  "repeatcharstring/RepeatCharString",
) as typeof RepeatCharString;

class BoundedRepeatCharString extends _RepeatCharString {
  readonly min: number;
  readonly max: number;

  constructor(
    min: number = 0,
    max: number = Infinity,
    ...repeatCharStringCtorParams: ConstructorParameters<
      typeof RepeatCharString
    >
  ) {
    try {
      super(...repeatCharStringCtorParams);
      for (const bound of [min, max]) {
        if (!new BoundedRepeatCharString.PositiveInteger(bound).isValid)
          throw SyntaxError(
            `the value ${bound} of min ${min} or max ${max} is not a valid positive integer`,
          );
      }
      let minIntToNum: number = new BoundedRepeatCharString.PositiveInteger(
        min,
      ).toNumber();
      let maxIntToNum: number = new BoundedRepeatCharString.PositiveInteger(
        max,
      ).toNumber();
      if (minIntToNum > maxIntToNum) {
        const tmp: number = minIntToNum;
        minIntToNum = maxIntToNum;
        maxIntToNum = tmp;
      }
      if (minIntToNum === Infinity) minIntToNum = maxIntToNum = 0;
      this.min = minIntToNum;
      this.max = maxIntToNum;
    } catch (e) {
      throw new EvalError(
        `BoundedRepeatCharString: constructor: Error creating BoundedRepeatCharString object: \n${e}`,
      );
    }
  }

  protected override _qualifies(candidateCharString: string): boolean {
    try {
      return (
        super._qualifies(candidateCharString) &&
        candidateCharString.length >= this.min &&
        candidateCharString.length <= this.max
      );
    } catch (e) {
      throw new EvalError(
        `BoundedRepeatCharString: _qualifies: Error calling _qualifies: \n${e}`,
      );
    }
  }

  static get PositiveInteger(): typeof PositiveInteger {
    try {
      return importModule(
        "./common/types/numbers/PositiveInteger",
      ) as typeof PositiveInteger;
    } catch (e) {
      throw new ReferenceError(
        `BoundedRepeatCharString: PositiveInteger: Error importing PositiveInteger module: \n${e}`,
      );
    }
  }

  static get RepeatCharString(): typeof RepeatCharString {
    try {
      return _RepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `BoundedRepeatCharString: RepeatCharString: Error importing RepeatCharString module: \n${e}`,
      );
    }
  }
}

module.exports = BoundedRepeatCharString;

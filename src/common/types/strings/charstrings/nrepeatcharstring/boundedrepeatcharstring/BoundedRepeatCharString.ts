const _RepeatCharString: typeof RepeatCharString = importModule(
  "repeatcharstring/RepeatCharString",
);

class BoundedRepeatCharString extends _RepeatCharString {
  readonly min: number;
  readonly max: number;

  constructor(
    min: number,
    max: number,
    charstring: string,
    ...ofCharInputs: Char.CharInput[]
  ) {
    try {
      let minInt: number = new BoundedRepeatCharString.PositiveInteger(
        min,
      ).toNumber();
      let maxInt: number = new BoundedRepeatCharString.PositiveInteger(
        max,
      ).toNumber();
      if (Number.isNaN(minInt) || Number.isNaN(maxInt)) minInt = maxInt = 0;
      else {
        if (minInt > maxInt) {
          const prevMinInt: number = minInt;
          minInt = maxInt;
          maxInt = prevMinInt;
        }
        if (minInt === Infinity) minInt = maxInt = 0;
      }
      super(
        charstring.length >= minInt && charstring.length <= maxInt
          ? charstring
          : "",
        ...ofCharInputs,
      );
      this.min = minInt;
      this.max = maxInt;
    } catch (e) {
      throw new Error(
        `BoundedRepeatCharString: constructor: Error creating BoundedRepeatCharString object: ${e}`,
      );
    }
  }

  protected static get PositiveInteger(): typeof PositiveInteger {
    try {
      return importModule("./common/types/numbers/PositiveInteger");
    } catch (e) {
      throw new ReferenceError(
        `BoundedRepeatCharString: PositiveInteger: Error importing PositiveInteger module: ${e}`,
      );
    }
  }

  static get RepeatCharString(): typeof RepeatCharString {
    try {
      return _RepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `BoundedRepeatCharString: RepeatCharString: Error importing RepeatCharString module: ${e}`,
      );
    }
  }
}

module.exports = BoundedRepeatCharString;

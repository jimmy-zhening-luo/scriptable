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
  }

  protected static get PositiveInteger(): typeof PositiveInteger {
    return importModule("./common/types/numbers/PositiveInteger");
  }

  static get RepeatCharString(): typeof RepeatCharString {
    return _RepeatCharString;
  }
}

module.exports = BoundedRepeatCharString;

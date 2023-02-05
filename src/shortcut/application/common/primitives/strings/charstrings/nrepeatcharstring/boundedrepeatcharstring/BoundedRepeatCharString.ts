const _RepeatCharString: typeof RepeatCharString = importModule("repeatcharstring/RepeatCharString");

class BoundedRepeatCharString extends _RepeatCharString {
  readonly min: number;
  readonly max: number;
  constructor(
    min: number,
    max: number,
    charstring: string
  );
  constructor(
    min: number,
    max: number,
    charstring: string,
    ...ofChars: Char[]
  );
  constructor(
    min: number,
    max: number,
    charstring: string,
    ...ofStrings: string[]
  );
  constructor(
    min: number,
    max: number,
    charstring: string,
    ...ofCharsets: string[][]
  );
  constructor(
    min: number,
    max: number,
    charstring: string,
    ...ofCharInputs: Char.CharInput[]
  );
  constructor(
    min: number,
    max: number,
    charstring: string,
    ...ofCharInputs: Char.CharInput[]
  ) {
    let minInt: number = new BoundedRepeatCharString.positiveInt(min).toNumber();
    let maxInt: number = new BoundedRepeatCharString.positiveInt(max).toNumber();
    if (Number.isNaN(minInt)
      || Number.isNaN(maxInt)
    ) minInt = maxInt = 0;
    else {
      if (minInt > maxInt) {
        const prevMinInt: number = minInt;
        minInt = maxInt;
        maxInt = prevMinInt;
      }
      if (minInt === Infinity)
        minInt = maxInt = 0;
    }
    super(
      charstring.length >= minInt && charstring.length <= maxInt ?
        charstring
        : "",
      ...ofCharInputs
    );
    this.min = minInt;
    this.max = maxInt;
  }
}

namespace BoundedRepeatCharString {
  export const positiveInt: typeof PositiveInteger = importModule("./shortcut/application/common/primitives/numbers/PositiveInteger");
}

module.exports = BoundedRepeatCharString;

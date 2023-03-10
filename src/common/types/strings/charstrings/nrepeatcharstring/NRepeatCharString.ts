const _BoundedRepeatCharString: typeof BoundedRepeatCharString = importModule(
  "boundedrepeatcharstring/BoundedRepeatCharString",
);

class NRepeatCharString extends _BoundedRepeatCharString {
  constructor(
    n: number,
    charstring: string,
    ...ofCharInputs: Char[] | string[] | string[][] | Char.CharInput[]
  ) {
    try {
      super(n, n, charstring, ...ofCharInputs);
    } catch (e) {
      throw new Error(
        `NRepeatCharString: constructor: Error creating NRepeatCharString object: ${e}`,
      );
    }
  }

  get n(): number {
    try {
      return this.max;
    } catch (e) {
      throw new Error(`NRepeatCharString: n: Error getting n: ${e}`);
    }
  }

  static get BoundedRepeatCharString(): typeof BoundedRepeatCharString {
    try {
      return _BoundedRepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `NRepeatCharString: BoundedRepeatCharString: Error importing BoundedRepeatCharString module: ${e}`,
      );
    }
  }
}

module.exports = NRepeatCharString;

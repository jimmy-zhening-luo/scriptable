const _BoundedRepeatCharString: typeof BoundedRepeatCharString = importModule(
  "boundedrepeatcharstring/BoundedRepeatCharString",
);

class NRepeatCharString extends _BoundedRepeatCharString {
  constructor(
    n: number,
    charstring: string,
    ...ofCharInputs: CharSet[] | string[] | string[][] | CharSet.CharInput[]
  ) {
    try {
      super(n, n, charstring, ...ofCharInputs);
    } catch (e) {
      throw new Error(
        `NRepeatCharString: constructor: Error creating NRepeatCharString object: \n${e}`,
      );
    }
  }

  get n(): number {
    try {
      return this.max;
    } catch (e) {
      throw new Error(`NRepeatCharString: n: Error getting n: \n${e}`);
    }
  }

  static get BoundedRepeatCharString(): typeof BoundedRepeatCharString {
    try {
      return _BoundedRepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `NRepeatCharString: BoundedRepeatCharString: Error importing BoundedRepeatCharString module: \n${e}`,
      );
    }
  }
}

module.exports = NRepeatCharString;

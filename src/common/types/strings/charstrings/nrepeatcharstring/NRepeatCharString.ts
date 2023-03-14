const _BoundedRepeatCharString: typeof BoundedRepeatCharString = importModule(
  "boundedrepeatcharstring/BoundedRepeatCharString",
);

class NRepeatCharString extends _BoundedRepeatCharString {
  constructor(
    n: ConstructorParameters<typeof BoundedRepeatCharString>[0],
    ...repeatCharStringCtorParams: ConstructorParameters<
      typeof RepeatCharString
    >
  ) {
    try {
      super(n, n, ...repeatCharStringCtorParams);
    } catch (e) {
      throw new EvalError(
        `NRepeatCharString: constructor: Error creating NRepeatCharString object: \n${e}`,
      );
    }
  }

  get n(): typeof NRepeatCharString.prototype.max {
    try {
      return this.max;
    } catch (e) {
      throw new EvalError(`NRepeatCharString: n: Error getting n: \n${e}`);
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

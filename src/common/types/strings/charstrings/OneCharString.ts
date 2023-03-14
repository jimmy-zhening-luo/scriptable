const _NRepeatCharString: typeof NRepeatCharString = importModule(
  "nrepeatcharstring/NRepeatCharString",
);

class OneCharString extends _NRepeatCharString {
  constructor(
    ...repeatCharStringCtorParams: ConstructorParameters<
      typeof RepeatCharString
    >
  ) {
    try {
      super(1, ...repeatCharStringCtorParams);
    } catch (e) {
      throw new EvalError(
        `OneCharString: constructor: Error creating OneCharString object: \n${e}`,
      );
    }
  }

  static get NRepeatCharString(): typeof NRepeatCharString {
    try {
      return _NRepeatCharString;
    } catch (e) {
      throw new ReferenceError(
        `OneCharString: NRepeatCharString: Error importing NRepeatCharString module: \n${e}`,
      );
    }
  }
}

module.exports = OneCharString;

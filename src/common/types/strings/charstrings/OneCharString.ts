const _NRepeatCharString: typeof NRepeatCharString = importModule(
  "nrepeatcharstring/NRepeatCharString",
);

class OneCharString extends _NRepeatCharString {
  constructor(
    charstring: string,
    ...ofCharInputs: CharSet[] | string[] | string[][] | CharSet.CharInput[]
  ) {
    try {
      super(1, charstring, ...ofCharInputs);
    } catch (e) {
      throw new Error(
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

const _NRepeatCharString: typeof NRepeatCharString = importModule("nrepeatcharstring/NRepeatCharString");

class OneCharString extends _NRepeatCharString {

  constructor(
    charstring: string,
    ...ofCharInputs:
      | Char[]
      | string[]
      | string[][]
      | Char.CharInput[]
  ) {
    super(1, charstring, ...ofCharInputs);
  }

  static get NRepeatCharString(): typeof NRepeatCharString {
    return _NRepeatCharString;
  }

}

module.exports = OneCharString;

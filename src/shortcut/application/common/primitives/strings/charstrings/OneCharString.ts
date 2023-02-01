const _NRepeatCharString: typeof NRepeatCharString = importModule("nrepeatcharstring/NRepeatCharString");

class OneCharString extends _NRepeatCharString {
  constructor(
    charstring: string
  );
  constructor(
    charstring: string,
    ...ofChars: Char[]
  );
  constructor(
    charstring: string,
    ...ofStrings: string[]
  );
  constructor(
    charstring: string,
    ...ofCharsets: string[][]
  );
  constructor(
    charstring: string,
    ...ofCharInputs: Char.CharInput[]
  );
  constructor(
    charstring: string,
    ...ofCharInputs: Char.CharInput[]
  ) {
    super(1, charstring, ...ofCharInputs);
  }
}

module.exports = OneCharString;

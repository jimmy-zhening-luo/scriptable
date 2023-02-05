const _BoundedRepeatCharString: typeof BoundedRepeatCharString = importModule("boundedrepeatcharstring/BoundedRepeatCharString");

class NRepeatCharString extends _BoundedRepeatCharString {
  constructor(
    n: number,
    charstring: string
  );
  constructor(
    n: number,
    charstring: string,
    ...ofChars: Char[]
  );
  constructor(
    n: number,
    charstring: string,
    ...ofStrings: string[]
  );
  constructor(
    n: number,
    charstring: string,
    ...ofCharsets: string[][]
  );
  constructor(
    n: number,
    charstring: string,
    ...ofCharInputs: Char.CharInput[]
  );
  constructor(
    n: number,
    charstring: string,
    ...ofCharInputs: Char.CharInput[]
  ) {
    super(n, n, charstring, ...ofCharInputs);
  }

  get n() {
    return this.max;
  }
}

module.exports = NRepeatCharString;

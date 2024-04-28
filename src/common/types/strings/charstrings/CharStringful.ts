const f_CharString: typeof CharString = importModule(
  "repeatcharstring/RepeatCharString",
) as typeof CharString;

class CharStringful<Brand extends string> extends f_CharString<
  Brand,
  stringful
> {
  public readonly min: posint;
  public readonly max: posinfinint;

  constructor(
    min: number = 1,
    max: number = Infinity,
    ...cStringCtorParams: ConstructorParameters<
      typeof CharString
    >
  ) {
    try {
      const minInt: posint = CharStringful.posint(
        min,
        "min",
      );
      const maxInt: posinfinint = CharStringful.posinfinint(
        max,
        "max",
      );

      if (minInt > maxInt)
        throw RangeError(
          `min '${minInt}' > max '${maxInt}'`,
        );
      else {
        super(...cStringCtorParams);

        if (this.string.length < minInt)
          throw RangeError(
            `length '${this.string.length}' < min '${minInt}' for input: ${this.string}`,
          );
        else if (this.string.length > maxInt)
          throw RangeError(
            `length '${this.string.length}' > max '${maxInt}' for input: ${this.string}`,
          );
        else
          [
            this.min,
            this.max,
          ] = [
            minInt,
            maxInt,
          ];
      }
    }
    catch (e) {
      throw new EvalError(
        `CharStringful: ctor: { min: ${min}, max: ${max} }`,
        { cause: e },
      );
    }
  }

  private static get posint(): typeof PosInt {
    try {
      return importModule("./common/types/literal/PosInt") as typeof PosInt;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import PosInt`,
        { cause: e },
      );
    }
  }

  private static get posinfinint(): typeof PosInfinInt {
    try {
      return importModule("./common/types/literal/PosInfinInt") as typeof PosInfinInt;
    }
    catch (e) {
      throw new ReferenceError(
        `App: import PosInfinInt`,
        { cause: e },
      );
    }
  }
}

module.exports = CharStringful;

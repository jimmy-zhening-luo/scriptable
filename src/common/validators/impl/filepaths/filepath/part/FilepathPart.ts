const fp_ValidString: typeof ValidString = importModule(
  "./common/validators/base/string/valid/ValidString",
) as typeof ValidString;

class FilepathPart extends fp_ValidString<
  stringful,
  "FilepathPart"
> {
  constructor(part: stringful) {
    try {
      super(
        part,
        [
          fp_ValidString.CharSet.colon,
          fp_ValidString.CharSet.slash,
        ],
        1,
        255,
        true,
      );
    }
    catch (e) {
      throw new EvalError(
        `FilepathPart: ctor`,
        { cause: e },
      );
    }
  }
}

module.exports = FilepathPart;

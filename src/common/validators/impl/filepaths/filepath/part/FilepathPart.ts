const fp_ValidString: typeof ValidString = importModule(
  "./common/validators/base/string/valid/ValidString",
) as typeof ValidString;

class FilepathPart extends fp_ValidString<"FilepathPart"> {
  constructor(part: stringful) {
    try {
      super(
        part,
        {
          max: 255,
          negate: true,
          chars: [
            fp_ValidString.CharSet.colon,
            fp_ValidString.CharSet.slash,
          ],
        },
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

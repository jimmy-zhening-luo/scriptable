const fpr_ValidString: typeof ValidString = importModule(
  "./common/types/strings/ValidString",
) as typeof ValidString;

class FilepathPart extends fpr_ValidString {
  constructor(part: string) {
    try {
      if (part.length < 1)
        throw new RangeError(
          `path part is empty; expected part length 1-255`,
        );
      else if (part.length > 255)
        throw new RangeError(
          `path part exceeds 255 chars; expected part length 1-255`,
        );
      else
        super(
          part,
          {
            min: 1,
            max: 255,
            negate: true,
            allowedChars: [
              ":",
              "/",
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

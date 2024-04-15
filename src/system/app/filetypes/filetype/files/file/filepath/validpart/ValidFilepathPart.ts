const fpr_ValidString: typeof ValidString = importModule(
  "./common/types/strings/ValidString",
) as typeof ValidString;

class ValidFilepathPart extends fpr_ValidString {
  constructor(part: string) {
    try {
      if (part.length < 1)
        throw new SyntaxError(
          `empty path part`,
        );
      else if (part.length > 255)
        throw new SyntaxError(
          `path part exceeds 255 chars`,
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
        `ValidFilepathPart: ctor: \n${e as string}`,
      );
    }
  }

  protected static get ValidString(): typeof ValidString {
    try {
      return fpr_ValidString;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidFilepathPart: import ValidString: \n${e as string}`,
      );
    }
  }
}

module.exports = ValidFilepathPart;

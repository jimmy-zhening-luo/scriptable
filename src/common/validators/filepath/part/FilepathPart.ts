const fpr_ValidString: typeof ValidString = importModule(
  "./common/types/strings/ValidString",
) as typeof ValidString;

class FilepathPart extends fpr_ValidString {
  constructor(part: string) {
    try {
      if (part.length < 1)
        throw new SyntaxError(
          `path part is empty`,
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
        `FilepathPart: ctor: \n${e as string}`,
      );
    }
  }
}

module.exports = FilepathPart;

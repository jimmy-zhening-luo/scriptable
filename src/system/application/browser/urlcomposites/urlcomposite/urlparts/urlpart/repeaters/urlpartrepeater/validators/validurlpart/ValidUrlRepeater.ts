const r_ValidUrlPart: typeof ValidUrlPart = importModule("ValidUrlPart");

class ValidUrlRepeater extends r_ValidUrlPart {
  constructor(
    part: string,
    minLength: number = 1,
    maxLength: number = Infinity,
    ...allowedChars: Char.CharInput[]
  ) {
    try {
      super(part, minLength, maxLength, {}, ...allowedChars);
    } catch (e) {
      throw new Error(
        `ValidUrlRepeater: constructor: error creating ValidUrlRepeater: ${e}`,
      );
    }
  }

  static get ValidUrlPart(): typeof ValidUrlPart {
    try {
      return r_ValidUrlPart;
    } catch (e) {
      throw new ReferenceError(
        `ValidUrlRepeater: error loading parent ValidUrlPart module: ${e}`,
      );
    }
  }
}

module.exports = ValidUrlRepeater;

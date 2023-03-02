const r_ValidUrlPart: typeof ValidUrlPart = importModule("ValidUrlPart");

class ValidUrlRepeater extends r_ValidUrlPart {
  constructor(
    part: string,
    minLength: number = 1,
    maxLength: number = Infinity,
    ...allowedChars: Char.CharInput[]
  ) {
    super(part, minLength, maxLength, {}, ...allowedChars);
  }

  static get ValidUrlPart(): typeof ValidUrlPart {
    return r_ValidUrlPart;
  }
}

module.exports = ValidUrlRepeater;

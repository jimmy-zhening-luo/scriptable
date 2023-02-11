const r_ValidUrlPart: typeof ValidUrlPart = importModule("ValidUrlPart");

class ValidUrlRepeater extends r_ValidUrlPart {
  constructor(
    part: string,
    {
      maxLength = Infinity
    }: {
      maxLength?: number
    },
    ...allowedChars: Char.CharInput[]
  ) {
    super(
      part,
      {},
      {
        maxLength: maxLength
      },
      ...allowedChars
    );
  }
}

module.exports = ValidUrlRepeater;

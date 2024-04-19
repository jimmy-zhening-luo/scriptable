const r_ValidUrlPart: typeof ValidUrlPart = importModule(
  "ValidUrlPart",
) as typeof ValidUrlPart;

class ValidUrlRepeater extends r_ValidUrlPart {
  constructor(
    part: string,
    minLength: number = 1,
    maxLength: number = Infinity,
    ...allowedChars: Array<ConstructorParameters<typeof ValidUrlPart>[4]>
  ) {
    try {
      super(part, minLength, maxLength, {}, ...allowedChars);
    }
    catch (e) {
      throw new Error(
        `ValidUrlRepeater: constructor: error creating ValidUrlRepeater`,
        { cause: e },
      );
    }
  }

  public static get ValidUrlPart(): typeof ValidUrlPart {
    try {
      return r_ValidUrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidUrlRepeater: error loading parent ValidUrlPart module`,
        { cause: e },
      );
    }
  }
}

module.exports = ValidUrlRepeater;

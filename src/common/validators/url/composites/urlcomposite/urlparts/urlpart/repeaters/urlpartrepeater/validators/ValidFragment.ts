const fr_ValidUrlPart: typeof ValidUrlPart = importModule(
  "validurlpart/ValidUrlPart",
) as typeof ValidUrlPart;

class ValidFragment extends fr_ValidUrlPart {
  constructor(fragment: string) {
    try {
      super(
        fragment,
        1,
        Infinity,
        {
          trimLeading: [...ValidFragment.CharSet.hash],
        },
        ValidFragment.CharSet.pchar,
        ValidFragment.CharSet.slash,
        ValidFragment.CharSet.question,
      );
    }
    catch (e) {
      throw new Error(
        `ValidFragment: constructor: error creating ValidFragment`,
        { cause: e },
      );
    }
  }

  public static get ValidUrlPart(): typeof ValidUrlPart {
    try {
      return fr_ValidUrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `ValidFragment: error loading parent ValidUrlPart module`,
        { cause: e },
      );
    }
  }
}

module.exports = ValidFragment;

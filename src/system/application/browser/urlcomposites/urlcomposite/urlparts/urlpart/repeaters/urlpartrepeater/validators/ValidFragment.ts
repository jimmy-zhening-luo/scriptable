const fr_ValidUrlPart: typeof ValidUrlPart = importModule(
  "validurlpart/ValidUrlPart",
);

class ValidFragment extends fr_ValidUrlPart {
  constructor(fragment: string) {
    try {
      super(
        fragment,
        1,
        Infinity,
        {
          trimLeading: [...ValidFragment.UrlChar.hash],
        },
        ValidFragment.UrlChar.pchar,
        ValidFragment.UrlChar.slash,
        ValidFragment.UrlChar.question,
      );
    } catch (e) {
      throw new Error(
        `ValidFragment: constructor: error creating ValidFragment: \n${e}`,
      );
    }
  }

  static get ValidUrlPart(): typeof ValidUrlPart {
    try {
      return fr_ValidUrlPart;
    } catch (e) {
      throw new ReferenceError(
        `ValidFragment: error loading parent ValidUrlPart module: \n${e}`,
      );
    }
  }
}

module.exports = ValidFragment;

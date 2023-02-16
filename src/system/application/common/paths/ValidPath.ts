const p_ValidString: typeof ValidString = importModule("./system/application/common/primitives/strings/ValidString");

class ValidPath extends p_ValidString {

  constructor(
    path?: null | string
  ) {
    super(
      path,
      {
        trim = true
      },
      {},
      this.Char.colon
    )
  }


  static get ValidString(): typeof ValidString {
    return p_ValidString;
  }

}

module.exports = ValidPath;

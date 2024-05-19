const fp_ValidString: typeof ValidString = importModule(
  "./common/validators/base/string/valid/ValidString",
) as typeof ValidString;

class FilepathNode extends fp_ValidString<
  stringful,
  "FilepathNode"
> {
  constructor(node: stringful) {
    try {
      super(
        node,
        [
          fp_ValidString.CharSet.colon,
          fp_ValidString.CharSet.slash,
        ],
        1,
        255,
        true,
      );
    }
    catch (e) {
      throw new EvalError(
        `FilepathNode: ctor`,
        { cause: e },
      );
    }
  }
}

module.exports = FilepathNode;

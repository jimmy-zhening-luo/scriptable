const fp_ValidString: typeof ValidString = importModule(
  "./common/validators/base/string/valid/ValidString",
) as typeof ValidString;

class FilepathNode extends fp_ValidString<
  stringful,
  "FilepathNode"
> {
  constructor(
    node: string,
  ) {
    try {
      super(
        node,
        [
          ":" as char,
          "/" as char,
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

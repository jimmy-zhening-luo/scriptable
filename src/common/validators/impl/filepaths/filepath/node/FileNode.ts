const fp_ValidString = importModule(
  `./common/validators/base/string/valid/ValidString`,
) as typeof ValidString;

class FileNode extends fp_ValidString<
  "FileNode"
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
        1 as posint,
        255 as posinfinint,
        true,
      );
    }
    catch (e) {
      throw new EvalError(
        `FileNode: ctor`,
        { cause: e },
      );
    }
  }
}

module.exports = FileNode;

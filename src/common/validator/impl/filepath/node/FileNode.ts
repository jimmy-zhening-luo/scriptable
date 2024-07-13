const fValidString = importModule(
  `./common/validator/base/string/ValidString`,
) as typeof ValidString;

class FileNode extends fValidString<"FileNode"> {
  constructor(node: string) {
    try {
      super(
        node,
        [
          ":" as char,
          "/" as char,
        ],
        { max: 255 as Positive<int> },
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

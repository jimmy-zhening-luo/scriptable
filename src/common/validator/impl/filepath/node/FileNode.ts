const fValidString = importModule<typeof ValidString>(
  `./common/validator/base/string/ValidString`,
);

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
      throw new Error(
        `FileNode`,
        { cause: e },
      );
    }
  }
}

module.exports = FileNode;

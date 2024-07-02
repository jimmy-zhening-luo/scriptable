import type CleanString from "../../../../base/string/valid/CleanString.js";

const cleanString = importModule(
  `./common/validator/base/string/valid/CleanString`,
) as typeof CleanString;

export default class FileNode extends cleanString<
  [
    `FileNode`,
  ]
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
        1 as Positive<fint>,
        255 as Positive<int>,
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

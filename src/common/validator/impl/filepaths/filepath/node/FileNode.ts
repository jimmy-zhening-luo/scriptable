const f_CleanString = importModule(
  `./common/validator/base/string/valid/CleanString`,
) as typeof CleanString;

class FileNode extends f_CleanString<
  [`FileNode`]
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

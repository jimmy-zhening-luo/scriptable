const fcharstring = importModule<typeof charstring>(
  `charstring/charstring`,
);

class filenode extends fcharstring<"filenode"> {
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
        `filenode`,
        { cause: e },
      );
    }
  }
}

module.exports = filenode;

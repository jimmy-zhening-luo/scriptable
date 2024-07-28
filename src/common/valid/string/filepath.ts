const fcharstring = importModule<typeof charstring>(
  "charstring/charstring",
);

class filepath<N extends number> {
  protected readonly nodes: ArrayN<Stringify<charstring<"filenode">>, N>;

  constructor(
    public readonly min: N,
    ...subpaths: (filepath<N> | string)[]
  ) {
    try {
      const nodes = subpaths
        .flatMap(
          subpath => typeof subpath !== "string"
            ? subpath.nodes
            : subpath
              .split("/")
              .map(node => node.trim())
              .filter((node): node is stringful => node.length > 0)
              .map(node => filepath.filenode(node).string),
        ),
      { length } = nodes;

      if (length < min)
        throw new RangeError(
          `Filepath too short`,
          { cause: { min, nodes } },
        );
      else
        this.nodes = nodes as ArrayN<Stringify<charstring<"filenode">>, N>;
    }
    catch (e) {
      throw new Error(
        `filepath`,
        { cause: e },
      );
    }
  }

  public get parent() {
    try {
      const { min, nodes } = this,
      { length } = nodes;

      if (length < 1)
        throw new RangeError(`Empty filepath has no parent.`);
      else if (length - 1 < min)
        throw new RangeError(
          `File parent is protected.`,
          { cause: { min, nodes } },
        );
      else {
        const parent = new (this.constructor as Constructor<typeof filepath<N>>)(
          min,
          this,
        );

        parent.nodes.pop();

        return parent;
      }
    }
    catch (e) {
      throw new Error(
        `filepath: parent`,
        { cause: e },
      );
    }
  }

  private static filenode(node: stringful) {
    return new fcharstring<"filenode">(
      node,
      [
        ":" as char,
        "/" as char,
      ],
      { max: 255 as Positive<int> },
    );
  }

  public prepend(root: Stringify<rootpath>) {
    return this.nodes.length > 0
      ? [root, String(this)].join("/") as typeof root
      : root;
  }

  public toString() {
    try {
      const { nodes } = this;

      return nodes.join("/") as fs<N extends 0 ? string : stringful>;
    }
    catch (e) {
      throw new Error(
        `filepath: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = filepath;

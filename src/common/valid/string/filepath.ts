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
      this.nodes = this.check(
        min,
        subpaths
          .flatMap(
            subpath => typeof subpath !== "string"
              ? subpath.nodes
              : subpath
                .split("/")
                .map(node => node.trim())
                .filter((node): node is stringful => node.length > 0)
                .map(node => filepath.filenode(node).string),
          ),
      );
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
      const { min } = this,
      parent = new (this.constructor as Constructor<typeof filepath<N>>)(
        min,
        this,
      );

      parent.pop();

      return parent;
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

  public prepend(root: rootpath.toString) {
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

  private pop() {
    try {
      const { min, nodes } = this,
      { length } = nodes;

      if (length < 1)
        throw new RangeError(`Filepath is already empty.`);
      else if (length - 1 < min)
        throw new RangeError(
          `Filepath would be too short after pop.`,
          { cause: { min, nodes } },
        );
      else {
        const queue = [...nodes].reverse(),
        [popped] = queue as Arrayful<typeof nodes[number]>;

        this.nodes.pop();

        return popped;
      }
    }
    catch (e) {
      throw new Error(
        `filepath: pop`,
        { cause: e },
      );
    }
  }

  private check(
    min: N,
    nodes: Stringify<charstring<"filenode">>[],
  ) {
    try {
      if (nodes.length < min)
        throw new RangeError(
          `filepath too short`,
          { cause: { min, nodes } },
        );
      else
        return nodes as ArrayN<Stringify<charstring<"filenode">>, N>;
    }
    catch (e) {
      throw new Error(
        `filepath: check`,
        { cause: e },
      );
    }
  }
}

module.exports = filepath;

const fcharstring = importModule<typeof charstring>(
  "charstring/charstring",
);

class filepath<N extends number> {
  protected readonly nodes: PathN<Stringify<typeof filepath.filenode>, N>;

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
                .map(node => String(filepath.filenode(node))),
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
      parent: filepath<N> = new (
        this.constructor as new (...args: ConstructorParameters<typeof filepath<N>>)=> filepath<N>
      )(
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
    try {
      return new fcharstring<"filenode">(
        node,
        [
          ":" as char,
          "/" as char,
        ],
        { max: 255 as Positive<int> },
      );
    }
    catch (e) {
      throw new ReferenceError(
        `filepath: import filenode`,
        { cause: e },
      );
    }
  }

  public prepend(root: rootpath.toString) {
    try {
      if (this.nodes.length > 0)
        return [root satisfies stringful, String(this)].join("/") as rootpath.toString;
      else
        return root;
    }
    catch (e) {
      throw new Error(
        `filepath: prepend`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      const { nodes } = this;

      return nodes.join("/") as N extends 0 ? string : stringful;
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
      const { min } = this,
      { length } = this.nodes,
      popped = this.nodes.pop() ?? null;

      if (popped === null)
        throw new RangeError(`filepath is already empty`);
      else if (this.nodes.length < min)
        throw new RangeError(
          `filepath would be too short after pop`,
          {
            cause: {
              min,
              before: length,
              after: this.nodes.length,
              nodes: this.nodes,
            },
          },
        );
      else
        return popped;
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
    nodes: readonly Stringify<typeof filepath.filenode>[],
  ) {
    try {
      if (nodes.length < min)
        throw new RangeError(
          `filepath too short`,
          { cause: { min, nodes } },
        );
      else
        return nodes as PathN<typeof filepath.filenode, N>;
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

class filepath<N extends number> {
  protected readonly nodes: PathN<filenode, N>;

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
                .filter(node => node.length > 0)
                .map(node => new filepath.filenode(node).string),
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

  private static get filenode() {
    try {
      return importModule<typeof filenode>(
        "filenode",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `filepath: import filenode`,
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
    nodes: PathN<filenode>,
  ) {
    try {
      if (nodes.length < min)
        throw new RangeError(
          `filepath too short`,
          { cause: { min, nodes } },
        );
      else
        return nodes as PathN<filenode, N>;
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

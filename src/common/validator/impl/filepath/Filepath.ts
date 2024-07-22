class Filepath<N extends number> {
  protected readonly nodes: PathN<FileNode, N>;

  constructor(
    public readonly min: N,
    ...subpaths: (Filepath<N> | string)[]
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
                .map(node => new Filepath.FileNode(node).string),
          ),
      );
    }
    catch (e) {
      throw new Error(
        `Filepath`,
        { cause: e },
      );
    }
  }

  private static get FileNode() {
    try {
      return importModule<typeof FileNode>(
        "node/FileNode",
      );
    }
    catch (e) {
      throw new ReferenceError(
        `Filepath: import FileNode`,
        { cause: e },
      );
    }
  }

  public get parent() {
    try {
      const { min } = this,
        parent: Filepath<N> = new (
          this.constructor as new (...args: ConstructorParameters<typeof Filepath<N>>)=> Filepath<N>
        )(
          min,
          this,
        );

      parent.pop();

      return parent;
    }
    catch (e) {
      throw new Error(
        `Filepath: parent`,
        { cause: e },
      );
    }
  }

  public prepend(root: Stringify<Filepath<1>>) {
    try {
      if (this.nodes.length > 0) {
        const rootThis = [root, String(this)] as const satisfies [stringful, string];

        return rootThis.join("/") as stringful;
      }
      else
        return root;
    }
    catch (e) {
      throw new Error(
        `Filepath: prepend`,
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
        `Filepath: toString`,
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
        throw new RangeError(`Filepath is already empty`);
      else if (this.nodes.length < min)
        throw new RangeError(
          `Filepath would be too short after pop`,
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
        `Filepath: pop`,
        { cause: e },
      );
    }
  }

  private check(
    min: N,
    nodes: PathN<FileNode>,
  ) {
    try {
      if (nodes.length < min)
        throw new RangeError(
          `Filepath too short`,
          { cause: { min, nodes } },
        );
      else
        return nodes as PathN<FileNode, N>;
    }
    catch (e) {
      throw new Error(
        `Filepath: check`,
        { cause: e },
      );
    }
  }
}

module.exports = Filepath;

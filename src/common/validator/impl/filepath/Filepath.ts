class Filepath<L extends number = 0> {
  protected readonly nodes: Nodes<FileNode, L>;

  constructor(
    public readonly min: L,
    ...subpaths: (Filepath<L> | string)[]
  ) {
    try {
      this.nodes = this.check(
        min,
        subpaths
          .flatMap(
            subpath =>
              typeof subpath !== "string"
                ? subpath.nodes
                : subpath
                  .split("/")
                  .map(
                    node =>
                      node.trim(),
                  )
                  .filter(
                    (node): node is stringful =>
                      node.length > 0,
                  )
                  .map(
                    node =>
                      new Filepath.FileNode(node).string,
                  ),
          ),
      );
    }
    catch (e) {
      throw new EvalError(
        `Filepath: ctor`,
        { cause: e },
      );
    }
  }

  private static get FileNode() {
    try {
      return importModule(
        "node/FileNode",
      ) as typeof FileNode;
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
      const { min } = this;
      const parent: this = new (
        this.constructor as new (
          ...args: ConstructorParameters<typeof Filepath<L>>
        )=> this
      )(
        min,
        this,
      );

      parent.pop();

      return parent;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: parent`,
        { cause: e },
      );
    }
  }

  public prepend(root: Stringify<Filepath<1>>) {
    try {
      if (this.nodes.length > 0) {
        const rootThis = [
          root,
          String(this) as Stringify<Filepath<1>>,
        ] as const;

        return rootThis.join("/") as Joint<typeof rootThis, "/">;
      }
      else
        return root;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: prepend`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      const { nodes } = this;

      return nodes.join("/") as Joint<typeof nodes, "/">;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: toString`,
        { cause: e },
      );
    }
  }

  private pop() {
    try {
      const { min } = this;
      const { length } = this.nodes;
      const popped = this.nodes.pop() ?? null;

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
      throw new EvalError(
        `Filepath: pop`,
        { cause: e },
      );
    }
  }

  private check(
    min: L,
    nodes: Nodes<FileNode>,
  ) {
    try {
      if (nodes.length < min)
        throw new RangeError(
          `Filepath too short`,
          {
            cause: {
              min,
              nodes,
            },
          },
        );
      else
        return nodes as Nodes<FileNode, L>;
    }
    catch (e) {
      throw new EvalError(
        `Filepath: check`,
        { cause: e },
      );
    }
  }
}

module.exports = Filepath;

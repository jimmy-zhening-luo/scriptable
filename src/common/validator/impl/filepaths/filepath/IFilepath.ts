abstract class IFilepath<
  Length,
> {
  protected readonly _nodes: Nodes<
    FileNode
    ,
    Length
  >;

  constructor(
    ...subpaths: (
      | string
      | IFilepath<Length>
    )[]
  ) {
    try {
      this
        ._nodes = this
          .check(
            subpaths
              .map(
                subpath =>
                  typeof subpath !== "string"
                    ? subpath._nodes
                    : new this.Splitterful(
                      subpath,
                      "/",
                      true,
                    )
                      .nodes
                      .map(
                        node =>
                          new this.FileNode(
                            node,
                          )
                            .string,
                      ),
              )
              .flat(),
          );
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: ctor`,
        { cause: e },
      );
    }
  }

  public get parent() {
    try {
      const parent = new (
        this.constructor as new (
          ...path: ConstructorParameters<typeof IFilepath<Length>>
        )=>
        this
      )(
        this,
      );

      parent.pop();

      return parent;
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: parent`,
        { cause: e },
      );
    }
  }

  public get isEmpty() {
    try {
      return this
        ._nodes
        .length < 1;
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: isEmpty`,
        { cause: e },
      );
    }
  }

  private get Splitterful() {
    try {
      return importModule(
        "./common/validator/base/string/splitters/Splitterful",
      ) as typeof Splitterful;
    }
    catch (e) {
      throw new ReferenceError(
        `IFilepath: import Splitterful`,
        { cause: e },
      );
    }
  }

  private get FileNode() {
    try {
      return importModule(
        "node/FileNode",
      ) as typeof FileNode;
    }
    catch (e) {
      throw new ReferenceError(
        `IFilepath: import FileNode`,
        { cause: e },
      );
    }
  }

  public prepend(
    root: Stringify<IFilepath<1>>,
  ) {
    try {
      if (this.isEmpty)
        return root;
      else {
        const rootThis = [
          root,
          String(this) as Stringify<IFilepath<1>>,
        ] as const;

        return rootThis
          .join(
            "/",
          ) as Joint<typeof rootThis, "/">;
      }
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: prepend`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      const { _nodes } = this;

      return _nodes
        .join(
          "/",
        ) as Joint<typeof _nodes, "/">;
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: toString`,
        { cause: e },
      );
    }
  }

  private pop() {
    try {
      const nodeQ = [...this._nodes]
        .reverse();

      if (this.poppable(nodeQ)) {
        this
          ._nodes
          .pop();

        return nodeQ[0];
      }
      else
        throw new RangeError(
          `filepath unpoppable`,
          {
            cause: {
              nodes: this._nodes,
              length: this
                ._nodes
                .length,
            },
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `IFilepath: pop`,
        { cause: e },
      );
    }
  }

  protected abstract check(nodes: Nodes<FileNode>): IFilepath<Length>["_nodes"];

  protected abstract poppable(nodes: Nodes<FileNode>): nodes is Nodes<FileNode, 1>;
}

module.exports = IFilepath;

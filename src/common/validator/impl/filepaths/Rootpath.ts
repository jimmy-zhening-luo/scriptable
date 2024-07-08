const r_Filepath = importModule(
  `filepath/IFilepath`,
) as typeof IFilepath;

class Rootpath extends r_Filepath<
  1
> {
  protected check(
    nodes: Nodes<FileNode>,
  ) {
    try {
      if (
        nodes
          .length > 0
      )
        return nodes as Nodes<
          FileNode
          ,
          1
        >;
      else
        throw new RangeError(
          `root path constructed with 0 nodes`,
          {
            cause: {
              nodes,
              length: nodes
                .length,
            },
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `Rootpath: check`,
        { cause: e },
      );
    }
  }

  protected poppable(
    nodes: Nodes<
      FileNode
    >,
  ): nodes is Nodes<
    FileNode
    ,
    2
  > {
    try {
      return nodes
        .length > 1;
    }
    catch (e) {
      throw new EvalError(
        `Rootpath: poppable`,
        { cause: e },
      );
    }
  }
}

module.exports = Rootpath;

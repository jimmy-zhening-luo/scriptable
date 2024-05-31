const r_Filepath = importModule(
  `filepath/IFilepath`,
) as typeof IFilepath;

class Rootpath extends r_Filepath<
  true
> {
  protected check(
    nodes: Array<
      Strung<
        FileNode
      >
    >,
  ) {
    try {
      if (
        nodes
          .length < 1
      )
        throw new RangeError(
          `root path constructed with 0 nodes`,
          {
            cause: {
              nodes,
              length: nodes.length,
            },
          },
        );
      else
        return nodes as Arrayful<
          Strung<
            FileNode
          >
        >;
    }
    catch (e) {
      throw new EvalError(
        `Rootpath: check`,
        { cause: e },
      );
    }
  }

  protected poppable(
    nodes: Array<
      Strung<
        FileNode
      >
    >,
  ): nodes is Arrayful<
    Strung<
      FileNode
    >
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

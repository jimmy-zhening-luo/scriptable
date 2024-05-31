const r_Filepath = importModule(
  `filepath/IFilepath`,
) as typeof IFilepath;

class Rootpath extends r_Filepath<
  true
> {
  protected check(
    nodes: filenode[],
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
          filenode
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
    nodes: filenode[],
  ): nodes is Arrayful<
    filenode
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

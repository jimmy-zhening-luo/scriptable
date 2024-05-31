const s_Filepath = importModule(
  `filepath/IFilepath`,
) as typeof IFilepath;

class Subpath extends s_Filepath<
  false
> {
  protected check(
    nodes: Array<
      ToString<
        FileNode
      >
    >,
  ) {
    try {
      return nodes;
    }
    catch (e) {
      throw new EvalError(
        `Subpath: check`,
        { cause: e },
      );
    }
  }

  protected poppable(
    nodes: Array<
      ToString<
        FileNode
      >
    >,
  ): nodes is Arrayful<
    ToString<
      FileNode
    >
  > {
    try {
      return nodes
        .length > 0;
    }
    catch (e) {
      throw new EvalError(
        `Subpath: poppable`,
        { cause: e },
      );
    }
  }
}

module.exports = Subpath;

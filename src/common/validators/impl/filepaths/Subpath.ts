const s_Filepath = importModule(
  `filepath/IFilepath`,
) as typeof IFilepath;

class Subpath extends s_Filepath<
  false
> {
  protected check(
    nodes: filenode[],
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
    nodes: filenode[],
  ): nodes is Arrayful<
    filenode
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

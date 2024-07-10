const s_Filepath = importModule(
  `filepath/IFilepath`,
) as typeof IFilepath;

class Subpath extends s_Filepath<
  0
> {
  protected check(
    nodes: Nodes<FileNode>,
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
    nodes: Nodes<FileNode>,
  ): nodes is Nodes<FileNode, 1> {
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

import type IFilepath from "./filepath/IFilepath.js";
import type FileNode from "./filepath/node/FileNode.js";

const iFilepath = importModule(
  `filepath/IFilepath`,
) as typeof IFilepath;

export default class Subpath extends iFilepath<
  0
> {
  protected check(
    nodes: Nodes<
      FileNode
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
    nodes: Nodes<
      FileNode
    >,
  ): nodes is Nodes<
    FileNode
    ,
    1
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

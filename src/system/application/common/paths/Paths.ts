class Paths {

  static joinPaths(
    left: string,
    right: string = ""
  ): string {
    return Paths.trimPath(
      FileManager.iCloud().joinPath(
        Paths.trimPath(left),
        Paths.trimPath(right)
      )
    );
  }

  static pathToTree(
    path: string
  ): string[] {
    return Paths
      .trimPath(path)
      .split("/")
      .map(
        (node: string): string => (
          Paths.trimPath(node)
        )
      )
      .filter(
        (node: string) => (
          node.trim() !== String()
        )
      );
  }

  static treeToPath(
    tree: string[]
  ): string {
    return Paths.trimPath(tree
      .map(
        (node: string): string => (
          Paths.trimPath(node)
        )
      )
      .filter(
        (node: string) => (
          node.trim() !== String()
        )
      )
      .join("/")
      .trim()
    );
  }

  static trimPath(
    path: string
  ): string {
    path = path.trim();
    while (path.startsWith("/"))
      path = path.slice(1);
    while (path.endsWith("/"))
      path = path.slice(0, -1);
    return path.trim();
  }

  static walkPath(
    path: string,
    relativePath: string = String()
  ): string {
    const pathTree: Array<string> = Paths
      .pathToTree(
        Paths.trimPath(path)
      );
    const relPathTree = Paths
      .pathToTree(
        Paths.trimPath(relativePath)
      );

    relPathTree.forEach(
      (node: string) => {
        if (node.trim() === "..")
          pathTree.pop();
        else if (node.trim() !== String())
          pathTree.push(node);
      }
    );

    return Paths.trimPath(
      Paths.treeToPath(pathTree)
    );
  }

}

namespace Paths {

  export const _ValidString: typeof ValidString = importModule("./system/application/common/primitives/strings/ValidString");

}

module.exports = Paths;

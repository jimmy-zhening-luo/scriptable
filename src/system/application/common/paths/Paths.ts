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
    return new Paths.ValidString(
      path,
      {
        trim: true,
        trimLeading: [
          ...Paths.ValidString.Char.slash
        ],
        trimTrailing: [
          ...Paths.ValidString.Char.slash
        ]
      },
      {}
    ).cleaned;
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

  static get ValidString(): typeof ValidString {
    return importModule("./system/application/common/primitives/strings/ValidString");
  }

}

module.exports = Paths;

class Filepath {

  static isValid(
    path:
      | string
      | string[]
  ): boolean {
    return new Filepath.ValidString(
      Array.isArray(path) ?
        path.join("/")
        : path
    ).isValid;
  }

  static trimPath(
    path: string
  ): null | string {
    return Filepath.isValid(path) ?
      new Filepath.ValidString(
        path,
        {
          trim: true,
          trimLeading: [
            ...Filepath.ValidString.Char
              .slash
          ],
          trimTrailing: [
            ...Filepath.ValidString.Char
              .slash
          ]
        },
        {}
      ).cleaned
      : null;
  }

  static cleanPath(
    path:
      | string
      | string[]
  ):
    null | string {
    return Filepath.isValid(
      typeof path === "string" ?
        path
        : path.join("/")
    ) ?
      typeof path === "string" ?
        Filepath.treeToPath(
          Filepath.pathToTree(path)
        )
        : Filepath.treeToPath(path)
      : null;
  }

  static joinPaths(
    left:
      string
      | string[],
    right: string = ""
  ): null | string {
    return Filepath.cleanPath(left) === null
      || Filepath.cleanPath(right) === null ?
      null
      : Filepath.trimPath(
        FileManager.iCloud().joinPath(
          Filepath.cleanPath(left),
          Filepath.cleanPath(right)
        )
      );
  }

  static walkPath(
    currentPath:
      | string
      | string[],
    relativePath: string = ""
  ): null | string {
    const relPathTree: string[] = typeof relativePath ===

      Filepath.pathToTree(
        Filepath.trimPath(
          relativePath
        )
      );



    const pathTree: string[] = (
      relPathTree
        .length > 0
      && relPathTree
        .find(node =>
          node
            .trim() !== ""
        ).trim() === "."
    ) ?
      []
      : Filepath
        .pathToTree(
          Filepath
            .trimPath(
              path
            )
        );

    relPathTree.forEach(
      (node) => {
        if (node.trim() === "..")
          pathTree
            .pop();
        else if (node.trim() !== "")
          pathTree.push(node);
      }
    );

    return Filepath.trimPath(
      Filepath.treeToPath(pathTree)
    );
  }

  static pathToTree(
    path: string
  ):
    null | string[] {
    return Filepath.isValid(path) ?
      Filepath
        .trim()
        .split(
          "/"
        ).map(node =>
          node
            .trim()
        ).filter(node =>
          node !== ""
        )
      : null;
  }

  static treeToPath(
    tree: string[]
  ):
    null | string {
    return new Filepath.isValid(tree) ?
      tree
        .map(node =>
          Filepath
            .trimPath(
              node
            )
        ).map(trimmedNode =>
          trimmedNode
            .includes(
              "/"
            ) ?
            Filepath.
              pathToTree(
                trimmedNode
              )
            : trimmedNode
        ).flat(1)
        .filter(node =>
          node !== ""
        ).join(
          "/"
        )
      : null;
  }

  get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    return Filepath.ValidFilepathRepeater;
  }

  static get ValidFilepathRepeater(): typeof ValidFilepathRepeater {
    return importModule("validfilepathrepeater/ValidFilepathRepeater");
  }

}

module.exports = Filepath;

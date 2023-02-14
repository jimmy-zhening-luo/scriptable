class Paths {
  
  static isValid(
    path:
      | string
      | string[]
  ): boolean {
    return new Paths.ValidString(
      Array.isArray(path) ?
        path.join("/")
        : path
    ).isValid;
  }
  
  static trimPath(
    path: string
  ): null | string {
    return Paths.isValid(path) ?
      new Paths.ValidString(
        path,
        {
          trim: true,
          trimLeading: [
            ...Paths.ValidString.Char
              .slash
          ],
          trimTrailing: [
            ...Paths.ValidString.Char
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
    null | string
  {
    return Paths.isValid(
      typeof path === "string" ?
        path
        : path.join("/")
    ) ?
      typeof path === "string" ?
        Paths.treeToPath(
          Paths.pathToTree(path)
        )
        : Paths.treeToPath(path)
      : null;
  }
  
  static joinPaths(
    left:
      string
      | string[],
    right: string = ""
  ): null | string {
    return Paths.cleanPath(left) === null
    || Paths.cleanPath(right) === null ?
      null
      : Paths.trimPath(
        FileManager.iCloud().joinPath(
          Paths.cleanPath(left),
          Paths.cleanPath(right)
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
    
    Paths.pathToTree(
      Paths.trimPath(
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
        : Paths
          .pathToTree(
            Paths
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

    return Paths.trimPath(
      Paths.treeToPath(pathTree)
    );
  }

  static pathToTree(
    path: string
  ): 
    null | string[]
  {
    return Paths.isValid(path) ?
      Paths
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
    null | string
  {
    return new Paths.isValid(tree) ?
        tree
          .map(node =>
            Paths
              .trimPath(
                node
              )
          ).map(trimmedNode =>
            trimmedNode
              .includes(
                "/"
              ) ?
                Paths.
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

  static get ValidString(): typeof ValidString {
    return importModule("./system/application/common/primitives/strings/ValidString");
  }

}

module.exports = Paths;

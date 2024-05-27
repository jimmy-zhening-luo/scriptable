class Bookmark {
  public readonly __proto: literalful<"Bookmark"> = "Bookmark";
  public readonly alias: Alias;
  public readonly path: rootpath;

  constructor(
    bookmark:
      | string
      | Bookmark
    ,
  ) {
    try {
      if (
        typeof bookmark !== "string"
      )
        (
          {
            alias: this
              .alias;
            path: this
              .path;
          } = bookmark
        );
      else {

        else
          this
            .alias = Bookmark
              .toAlias(
                bookmark,
              );
          this
            .path = FileManager
              .iCloud()
              .bookmarkedPath(
                bookmark,
              ) as rootpath;
      }
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: ctor`,
        { cause: e },
      );
    }
  }

  public static [Symbol.hasInstance](instance: unknown) {
    try {
      return (
        instance !== null
        && typeof instance === "object"
        && (instance as { __proto: string }).__proto === "Bookmark"
      );
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: [Symbol.hasInstance]`,
        { cause: e },
      );
    }
  }

  private static toAlias(
    string: string,
  ) {
    try {
      const alias = Bookmark
        .stringful(
          string,
        );

      if (
        !FileManager
          .iCloud()
          .bookmarkExists(
            alias,
          )
      )
        throw new ReferenceError(
          `no Scriptable bookmark with alias`,
          { cause: { alias } },
        );
      else
        return alias as Alias;
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: toAlias`,
        { cause: e },
      );
    }
  }

  private static stringful(
    string: string,
  ) {
    try {
      const trimmed = string
        .trim();

      if (
        trimmed
          .length < 1
      )
        throw new SyntaxError(
          `trimmed alias is empty string`,
          { cause: { string } },
        );
      else
        return trimmed as stringful;
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: stringful`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      return this
        .path;
    }
    catch (e) {
      throw new EvalError(
        `Bookmark: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = Bookmark;

class Bookmark {
  public readonly alias: Alias;
  public readonly path: Stringify<Rootpath>;
  protected readonly __proto = "Bookmark";

  constructor(
    bookmark: string,
  ) {
    try {
      const alias = bookmark
        .trim();

      if (alias.length < 1)
        throw new SyntaxError(
          `empty alias`,
        );
      else if (
        !FileManager
          .local()
          .bookmarkExists(
            alias as stringful,
          )
      )
        throw new ReferenceError(
          `no bookmark matching alias`,
          { cause: { alias } },
        );
      else {
        this
          .alias = alias as Alias;
        this
          .path = FileManager
            .local()
            .bookmarkedPath(
              bookmark,
            ) as Stringify<Rootpath>;
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
}

module.exports = Bookmark;

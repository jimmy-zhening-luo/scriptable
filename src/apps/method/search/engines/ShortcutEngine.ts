const s_IEngine = importModule(
  `engine/IEngine`,
) as typeof IEngine;

class ShortcutEngine extends s_IEngine {
  protected readonly shortcut: string;

  constructor(
    shortcut: string,
    output = "",
  ) {
    try {
      if (
        shortcut
          .length < 1
      )
        throw new SyntaxError(
          `no shortcut engine name provided`,
        );
      else {
        super(
          "shortcut",
          output !== "write"
            ? output
            : shortcut
              .toLowerCase()
              .replaceAll(
                ".",
                "",
              )
              .replaceAll(
                "_",
                "",
              )
              .trim()
              .replaceAll(
                " ",
                "",
              ),
        );
        this
          .shortcut = shortcut;
      }
    }
    catch (e) {
      throw new EvalError(
        `ShortcutEngine: ctor`,
        { cause: e },
      );
    }
  }

  protected options() {
    try {
      const { shortcut } = this;

      return { shortcut };
    }
    catch (e) {
      throw new EvalError(
        `ShortcutEngine: options`,
        { cause: e },
      );
    }
  }
}

module.exports = ShortcutEngine;

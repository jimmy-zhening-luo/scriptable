const s_IEngine = importModule(
  `engine/IEngine`,
) as typeof IEngine;

class ShortcutEngine extends s_IEngine {
  protected readonly shortcut: string;
  protected readonly output: boolean;
  protected readonly write: boolean;

  constructor(
    shortcut: string,
    output = false,
    write = false,
    postfix?: string,
  ) {
    try {
      super(
        "shortcut",
        postfix
        ?? shortcut
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

      if (
        shortcut
          .length > 0
      ) {
        this
          .shortcut = shortcut;
        this
          .output = output;
        this
          .write = write;
      }
      else
        throw new SyntaxError(
          `'shortcut' field empty`,
        );
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
      const {
        shortcut,
        output,
        write,
      } = this;

      return {
        shortcut,
        output,
        write,
      };
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

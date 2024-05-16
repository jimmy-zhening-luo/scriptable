const s_IEngine: typeof IEngine = importModule(
  "engine/IEngine",
) as typeof IEngine;

class ShortcutEngine extends s_IEngine {
  public readonly shortcut: stringful;
  public readonly output: boolean;

  constructor(
    shortcut: string,
    output: boolean = false,
  ) {
    try {
      super("shortcut");

      if (shortcut.length < 1)
        throw new SyntaxError(
          `shortcut engine has empty shortcut name`,
        );
      else {
        this.shortcut = shortcut as stringful;
        this.output = output;
      }
    }
    catch (e) {
      throw new EvalError(
        `ShortcutEngine: ctor`,
        { cause: e },
      );
    }
  }

  protected options(): Required<Pick<SearchOutput, "shortcut" | "output">> {
    try {
      return {
        shortcut: this.shortcut,
        output: this.output,
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

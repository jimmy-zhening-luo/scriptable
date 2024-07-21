const sIEngine = importModule<typeof SearchEngine>(
  `engine/SearchEngine`,
);

class ShortcutEngine extends sIEngine {
  protected readonly shortcut: string;

  constructor(
    shortcut: string,
    output?: string | boolean,
  ) {
    try {
      super(
        "shortcut",
        output,
      );
      this.shortcut = shortcut;
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

const sIEngine = importModule<typeof SearchEngine>(
  `engine/SearchEngine`,
);

class ShortcutEngine extends sIEngine {
  protected readonly shortcut: string;

  constructor(
    shortcut: string,
    output?: string | boolean,
  ) {
    super(
      "shortcut",
      output,
    );

    if (shortcut.length > 0)
      this.shortcut = shortcut;
    else
      throw new ReferenceError(`'Run Shortcut' name is empty`);
  }

  protected options() {
    const { shortcut } = this;

    return { shortcut };
  }
}

module.exports = ShortcutEngine;

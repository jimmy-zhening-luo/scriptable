const sIEngine = importModule<typeof SearchEngine>("engine/index");

class ShortcutEngine extends sIEngine<"shortcut"> {
  constructor(shortcut: string, output?: string | boolean) {
    super("shortcut", shortcut, output);
  }

  protected options() {
    return {};
  }
}

module.exports = ShortcutEngine;

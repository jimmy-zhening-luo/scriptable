import type { SearchEngine } from "./engine/index";

const sSearchEngine = importModule<typeof SearchEngine>("./engine/index");

class ShortcutEngine extends sSearchEngine<"shortcut"> {
  constructor(
    shortcut: string,
    output?: boolean,
  ) {
    super(
      "shortcut",
      shortcut,
      output,
    );
  }

  protected options() {
    return {};
  }
}

module.exports = ShortcutEngine;
export type { ShortcutEngine as default };

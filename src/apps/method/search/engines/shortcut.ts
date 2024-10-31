import type SearchEngine from "./engine";

const sSearchEngine = importModule<typeof SearchEngine>("./engine");

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

  protected optional() {
    return {};
  }
}

export default ShortcutEngine;

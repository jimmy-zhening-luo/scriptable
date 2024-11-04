import SearchEngine from "./engine";

class ShortcutEngine extends SearchEngine<"shortcut"> {
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

import type { SearchEngine } from "./engine/index";

const fSearchEngine = importModule<typeof SearchEngine>("./engine/index");

class FindEngine extends fSearchEngine<"find"> {
  constructor(find: string) {
    super("find", find);
  }

  protected options() {
    return {};
  }
}

module.exports = FindEngine;
export type { FindEngine as default };

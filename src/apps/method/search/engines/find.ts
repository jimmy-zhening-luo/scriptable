import type { SearchEngine } from "./engine";

const fSearchEngine = importModule<typeof SearchEngine>("./engine");

class FindEngine extends fSearchEngine<"find"> {
  constructor(find: string) {
    super("find", find);
  }

  protected optional() {
    return {};
  }
}

module.exports = FindEngine;
export type { FindEngine as default };

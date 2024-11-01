import SearchEngine from "./engine";

class FindEngine extends SearchEngine<"find"> {
  constructor(find: string) {
    super("find", find);
  }

  protected optional() {
    return {};
  }
}

export default FindEngine;

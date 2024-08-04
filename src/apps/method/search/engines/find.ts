const fIEngine = importModule<typeof SearchEngine>("engine/index");

class FindEngine extends fIEngine<"find"> {
  constructor(find: string) {
    super("find", find);
  }

  protected options() {
    return {};
  }
}

module.exports = FindEngine;

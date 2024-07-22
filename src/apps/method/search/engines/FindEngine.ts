const fIEngine = importModule<typeof SearchEngine>(
  `engine/SearchEngine`,
);

class FindEngine extends fIEngine {
  protected readonly find: string;

  constructor(find: string) {
    super("find");

    if (find.length > 0)
      this.find = find;
    else
      throw new ReferenceError(`Find provider is empty`);
  }

  protected options() {
    const { find } = this;

    return { find };
  }
}

module.exports = FindEngine;

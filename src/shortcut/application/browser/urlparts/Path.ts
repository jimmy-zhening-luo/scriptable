// WIP
class Path extends UrlPart {
  constructor(
    path?: (string
      | Path
      | undefined
    )
  ) {
    super(path);
  }

  protected parse(path: string): string {
    return path;
  }

}

// WIP
class Query extends UrlPart {
  readonly params: Array<typeof Query.QueryParam>;
  constructor(
    query?: (string
      | Query
      | undefined
    )
  ) {
    super(query);
    this.params = new Array<typeof Query.QueryParam>();
  }

  protected static get QueryParam() {
    return importModule("query/QueryParam");
  }

  protected parse(query: string): string {
    return query;
  }

  static fromObjectEntries() {

  }

  static fromQueryString() {

  }
}

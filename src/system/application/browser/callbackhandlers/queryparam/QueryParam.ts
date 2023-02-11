class QueryParam {
  readonly key: Types.stringful;
  value: string;

  constructor(
    key: Types.stringful,
    value: string
  ) {
    this.key = key;
    this.value = value;
  }
}

module.exports = QueryParam;

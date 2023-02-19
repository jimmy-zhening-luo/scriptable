abstract class RequestHeader<T extends string | number | boolean> {

  key: string;
  value: T;

  constructor(
    key: string,
    value: T
  ) {
    this.key = key;
    this.value = value;
  }

  setKeyValue(
    key: string,
    value: T
  ): this {
    this.key = key;
    this.value = value;
    return this;
  }

  get header(): string {
    return this.tuple.join(": ");
  }

  get tuple(): [string, T] {
    return [
      this.key,
      this.value
    ];
  }

  get stringTuple(): [string, string] {
    return [
      this.key,
      this.stringValue
    ]
  }

  get stringValue(): string {
    return this.value.toString();
  }

  toString(): typeof RequestHeader.prototype.header {
    return this.header;
  }

  toTuple(): typeof RequestHeader.prototype.tuple {
    return this.tuple;
  }

  toStringTuple(): typeof RequestHeader.prototype.stringTuple {
    return this.stringTuple;
  }

}

module.exports = RequestHeader;

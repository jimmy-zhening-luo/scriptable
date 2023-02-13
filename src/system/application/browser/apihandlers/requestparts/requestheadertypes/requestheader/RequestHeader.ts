abstract class RequestHeader<T extends Types.primitive> {

  key: Types.stringful;
  value: T;

  constructor(
    key: Types.stringful,
    value: T
  ) {
    this.key = key;
    this.value = value;
  }

  setKeyValue(
    key: Types.stringful,
    value: T
  ): this {
    this.key = key;
    this.value = value;
    return this;
  }

  get header(): Types.stringful {
    return this.tuple.join(": ");
  }

  get tuple(): [Types.stringful, T] {
    return [
      this.key,
      this.value
    ];
  }

  get stringTuple(): [Types.stringful, string] {
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

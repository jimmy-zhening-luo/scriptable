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

  get stringValue(): string {
    return this.value.toString();
  }

  get keyValueTuple(): [Types.stringful, T] {
    return [
      this.key,
      this.value
    ];
  }

  get keyValueObject(): Record<Types.stringful, T> {
      return {
        [this.key]: this.value
    };
  }

  get keyValueStringObject(): Record<Types.stringful, string> {
    return {
      [this.key]: this.stringValue
    };
  }

  get keyValue(): Types.stringful {
    return this.keyValueTuple.join(": ");
  }

  toTuple(): typeof RequestHeader.prototype.keyValueTuple {
    return this.keyValueTuple;
  }

  toObject(): typeof RequestHeader.prototype.keyValueObject {
    return this.keyValueObject;
  }

  toStringObject(): typeof RequestHeader.prototype.keyValueStringObject {
    return this.keyValueStringObject;
  }

  toString(): Types.stringful {
    return this.keyValue;
  }

}

module.exports = RequestHeader;

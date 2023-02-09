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

  get valueString(): string {
    return this.value.toString();
  }

  get keyValueTuple(): [Types.stringful, T] {
    return [
      this.key,
      this.value
    ];
  }

  get keyValueObject(): {
    [key: Types.stringful]: T
  } {
      return {
        [this.key]: this.value
    };
  }

  get keyValueStringObject(): {
    [key: Types.stringful]: string
  } {
    return {
      [this.key]: this.valueString
    };
  }

  get keyValue(): Types.stringful {
    return this.keyValueTuple.join(": ");
  }

  toTuple(): [Types.stringful, T] {
    return this.keyValueTuple;
  }

  toObject(): {
    [key: Types.stringful]: T
  } {
    return this.keyValueObject;
  }

  toStringObject(): {
    [key: Types.stringful]: string
  } {
    return this.keyValueStringObject;
  }

  toString(): Types.stringful {
    return this.keyValue;
  }

}

module.exports = RequestHeader;

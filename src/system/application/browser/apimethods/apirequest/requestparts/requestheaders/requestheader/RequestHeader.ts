abstract class RequestHeader<T extends Types.primitive> {

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

  get isValid(): boolean {
    return this.key !== "";
  }

  get valueString(): string {
    return this.value.toString();
  }

  get keyValueTuple(): [] | [string, T] {
    return this.isValid ?
      [
        this.key,
        this.value
      ]
      : [];
  }

  get keyValueObject(): {
    [key: string]: T
  } {
    return this.isValid ?
      {
        [this.key]: this.value as T
      }
      : {};
  }

  get keyValue(): string {
    return this.isValid ?
      this.keyValueTuple.join(": ")
      : "";
  }

  toTuple(): [] | [string, T] {
    return this.keyValueTuple;
  }

  toObject(): {
    [key: string]: T
  } {
    return this.keyValueObject;
  }

  toString(): string {
    return this.keyValue;
  }

}

module.exports = RequestHeader;

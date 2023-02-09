abstract class RequestHeader {

  readonly key: string;
  readonly value: Types.primitive;

  constructor(keyValue: [
    string,
    Types.primitive?
  ]);
  constructor(
    key: string,
    value?: Types.primitive
  );
  constructor(
    keyOrKeyValue: string | [string, Types.primitive?],
    value?: Types.primitive
  ) {
    if (typeof keyOrKeyValue === "string") {
      this.key = keyOrKeyValue;
      this.value = value ?? "";
    }
    else {
      this.key = keyOrKeyValue[0];
      this.value = keyOrKeyValue[1] ?? "";
    }
  }

  get keyValueTuple(): [string, Types.primitive] {
    return [this.key, this.value];
  }

  get keyValueObject(): {
    [key: string]: Types.primitive
  } {
    return {
      [this.key]: this.value
    };
  }

  get keyValue(): string {
    return this.keyValueTuple.join(": ");
  }

  toTuple(): [string, Types.primitive] {
    return this.keyValueTuple;
  }

  toObject(): {
    [key: string]: Types.primitive
  } {
    return this.keyValueObject;
  }

  toString(): string {
    return this.keyValue;
  }
}

namespace RequestHeader {
}

module.exports = RequestHeader;

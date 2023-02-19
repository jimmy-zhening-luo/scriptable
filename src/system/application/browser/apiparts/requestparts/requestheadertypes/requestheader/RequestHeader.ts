abstract class RequestHeader<ValueType extends primitive> {

  private readonly _header:
    | null
    | {
      key: string,
      value: ValueType
    };

  constructor(
    headerOrKey:
      | string
      | [string, ValueType]
      | Record<string, ValueType>
      | RequestHeader<ValueType> = "",
    value: ValueType
  ) {
    this._header = this.setKeyValue(
      headerOrKey,
      value
    );
  }

  get isValid(): boolean {
    return this._header !== null;
  }

  get key(): string {
    return this._header?.key ?? "";
  }

  get value(): string {
    return String(
      this._header?.value
      ?? ""
    );
  }

  get stringValue(): string {
    return this.value;
  }

  get booleanValue(): boolean {
    return this.value === "true";
  }

  get numberValue(): number {
    if (Number.isSafeI

    return Number.isNaN(Number.parseFloat(this.stringValue)) ?
      Number.isNaN(Number.parseInt(this.stringValue)) ?
        NaN
        : Number.parseInt(this.stringValue)
      : Number.isNaN(Number.parseInt(this.stringValue)) ?
        Number.parseFloat(this.stringValue)
        : Number.parseInt(this.stringValue);


  get header(): [string, string] {
    return [
      this.key,
      this.value
    ]
  }

  setKeyValue(
    key: string,
    value: ValueType
  ): this {
    this.key = key;
    this.value = value;
    return this;
  }

  get tuple(): [string, ValueType] {
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

  toString(): typeof RequestHeader.prototype.header {
    return this.header;
  }

  toTuple(): typeof RequestHeader.prototype.tuple {
    return this.tuple;
  }

  toStringTuple(): typeof RequestHeader.prototype.stringTuple {
    return this.stringTuple;
    }

    private get Numbers(): typeof Numbers {
    return RequestHeader.Numbers;
    }

  private get

  static get Numbers(): typeof Numbers {
    return importModule("./common/types/numbers/Numbers");
  }

}

module.exports = RequestHeader;

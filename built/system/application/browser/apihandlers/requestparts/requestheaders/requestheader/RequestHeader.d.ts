declare abstract class RequestHeader<T extends Types.primitive> {
    key: Types.stringful;
    value: T;
    constructor(key: Types.stringful, value: T);
    setKeyValue(key: Types.stringful, value: T): this;
    get stringValue(): string;
    get keyValueTuple(): [Types.stringful, T];
    get keyValueObject(): Record<Types.stringful, T>;
    get keyValueStringObject(): Record<Types.stringful, string>;
    get keyValue(): Types.stringful;
    toTuple(): typeof RequestHeader.prototype.keyValueTuple;
    toObject(): typeof RequestHeader.prototype.keyValueObject;
    toStringObject(): typeof RequestHeader.prototype.keyValueStringObject;
    toString(): Types.stringful;
}
//# sourceMappingURL=RequestHeader.d.ts.map
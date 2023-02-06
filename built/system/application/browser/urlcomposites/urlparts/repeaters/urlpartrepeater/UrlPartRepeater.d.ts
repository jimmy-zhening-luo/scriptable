declare abstract class UrlPartRepeater {
    readonly value: null | string;
    constructor(repeater?: null | string);
    protected abstract parse(repeater: string): null | string;
    get isValid(): boolean;
    toString(): string;
}
//# sourceMappingURL=UrlPartRepeater.d.ts.map
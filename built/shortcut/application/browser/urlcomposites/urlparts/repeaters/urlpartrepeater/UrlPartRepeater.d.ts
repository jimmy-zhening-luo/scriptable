declare abstract class UrlPartRepeater {
    readonly value: null | string;
    constructor(repeater: string);
    protected abstract parse(repeater: string): null | string;
    get isValid(): boolean;
    get string(): string;
    toString(): string;
}
//# sourceMappingURL=UrlPartRepeater.d.ts.map
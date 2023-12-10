declare abstract class UrlPartRepeater {
    readonly value: null | string;
    constructor(repeater: null | string);
    static get UrlValidators(): typeof UrlValidators;
    get isValid(): boolean;
    toString(): string;
    protected abstract parse(repeater: string): null | string;
}
//# sourceMappingURL=UrlPartRepeater.d.ts.map
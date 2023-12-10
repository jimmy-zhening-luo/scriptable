declare abstract class UrlComposite {
    abstract readonly parts: Array<UrlPart | UrlComposite>;
    static get UrlParts(): typeof UrlParts;
    get isValid(): boolean;
    abstract get composite(): string;
    toString(): string;
}
//# sourceMappingURL=UrlComposite.d.ts.map
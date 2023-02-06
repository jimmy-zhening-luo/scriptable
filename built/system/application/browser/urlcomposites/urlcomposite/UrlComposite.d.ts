declare abstract class UrlComposite {
    abstract readonly parts: Array<UrlPart | UrlComposite>;
    abstract get composite(): string;
    get isValid(): boolean;
    toString(): string;
}
//# sourceMappingURL=UrlComposite.d.ts.map
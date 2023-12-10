declare const fr_UrlPart: typeof UrlPart;
declare class Fragment extends fr_UrlPart {
    constructor(fragment?: string | Fragment);
    static get ValidFragment(): typeof ValidFragment;
    static get UrlPart(): typeof UrlPart;
    protected parse(fragment: string): null | string;
}
//# sourceMappingURL=Fragment.d.ts.map
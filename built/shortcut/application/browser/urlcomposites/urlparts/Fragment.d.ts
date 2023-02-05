declare const fr_UrlPart: typeof UrlPart;
declare class Fragment extends fr_UrlPart {
    readonly encode: boolean;
    constructor(fragment?: string | Fragment, encode?: boolean);
    protected parse(fragment: string): null | string;
}
declare namespace Fragment {
    const _ValidFragment: typeof ValidFragment;
}
//# sourceMappingURL=Fragment.d.ts.map
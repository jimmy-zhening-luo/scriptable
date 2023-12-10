declare class Bookmark {
    readonly _nominalType: string;
    readonly alias: string;
    constructor(bookmark?: string);
    get resolves(): boolean;
    get path(): string;
    static [Symbol.hasInstance](instance: any): boolean;
    toString(): string;
}
//# sourceMappingURL=Bookmark.d.ts.map
declare class FilepathString {
    readonly _nominalType: string;
    private readonly _tree;
    constructor(...filepaths: Array<string | string[] | FilepathString>);
    static get ValidFilepathRepeater(): typeof ValidFilepathRepeater;
    static get StringSplitter(): typeof StringSplitter;
    get isEmpty(): boolean;
    get parent(): FilepathString;
    get leaf(): string;
    static [Symbol.hasInstance](instance: any): boolean;
    static join(...filepaths: ConstructorParameters<typeof FilepathString>): string;
    private static _validate;
    append(...filepaths: ConstructorParameters<typeof FilepathString>): FilepathString;
    cd(relativeFilepath: ConstructorParameters<typeof FilepathString>[0]): this;
    toTree(): string[];
    toString(): string;
}
//# sourceMappingURL=FilepathString.d.ts.map
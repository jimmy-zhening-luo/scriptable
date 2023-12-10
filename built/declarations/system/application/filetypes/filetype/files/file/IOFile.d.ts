declare class IOFile {
    readonly _nominalType: string;
    private readonly _root;
    private _subpath;
    constructor(base?: IOFile | Bookmark | ConstructorParameters<typeof FilepathString>[0], ...subpaths: ConstructorParameters<typeof FilepathString>);
    static get Bookmark(): typeof Bookmark;
    static get FilepathString(): typeof FilepathString;
    get subpath(): string;
    get path(): string;
    get leaf(): string;
    get root(): this;
    get parent(): this;
    get exists(): boolean;
    get isFile(): boolean;
    get isDirectory(): boolean;
    get isRoot(): boolean;
    get isLeaf(): boolean;
    get ls(): string[];
    get descendants(): IOFile[];
    private get _path();
    set subpath(subpath: ConstructorParameters<typeof FilepathString>[0]);
    static [Symbol.hasInstance](instance: any): boolean;
    static join(...filepaths: Parameters<typeof FilepathString.join>): ReturnType<typeof FilepathString.join>;
    append(...filepaths: Parameters<typeof FilepathString.prototype.append>): this;
    cd(...relativeFilepath: Parameters<typeof FilepathString.prototype.cd>): this;
    read(): string;
    write(data: string, overwrite?: boolean): this;
    delete(force?: boolean): Promise<this>;
    toString(): string;
    toTree(): string[];
}
//# sourceMappingURL=IOFile.d.ts.map
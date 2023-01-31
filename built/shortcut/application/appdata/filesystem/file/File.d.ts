/// <reference types="scriptable" />
declare const _Bookmark: typeof Bookmark;
declare class File {
    #private;
    readonly bookmark: Bookmark;
    constructor();
    constructor(subpath: string);
    constructor(bookmark: Bookmark, subpath?: string);
    constructor(file: File, relativePath?: string);
    get bookmarkedPath(): string;
    get data(): string;
    get descendants(): File[];
    get exists(): boolean;
    get isBottom(): boolean;
    get isDirectory(): boolean;
    get isEnumerable(): boolean;
    get isFile(): boolean;
    get isReadable(): boolean;
    get isTop(): boolean;
    get leaf(): string;
    get ls(): Array<string>;
    get parent(): File;
    get parentExists(): boolean;
    get parentIsSelf(): boolean;
    get parentPath(): string;
    get parentSubpath(): string;
    get path(): string;
    get pathTree(): Array<string>;
    get root(): string;
    get subpath(): string;
    set subpath(path: string);
    get subpathTree(): Array<string>;
    cd(relativePath: string): void;
    delete(force?: boolean): void;
    pathRelativeTo(relativePath: string): string;
    read(): string;
    subpathRelativeTo(relativePath: string): string;
    toString(): string;
    write(data: string, overwrite?: boolean): void;
    protected static get m(): FileManager;
    static joinPaths(left: string, right?: string): string;
    static pathToTree(path: string): Array<string>;
    static treeToPath(tree: Array<string>): string;
    static trimPath(path: string): string;
    static walkPath(path: string, relativePath?: string): string;
}
//# sourceMappingURL=File.d.ts.map
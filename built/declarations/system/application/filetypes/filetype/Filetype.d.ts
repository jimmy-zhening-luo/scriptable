declare abstract class Filetype {
    protected readonly _file: IOFile;
    constructor(utilityClassName: string, utilityFileSubpath: string, FileTypeConstructor?: typeof IOFile);
    static get Files(): typeof Files;
    static get ReadOnlyIOFile(): typeof ReadOnlyIOFile;
    static get IOFile(): typeof IOFile;
    get isFile(): boolean;
    get path(): typeof Filetype.prototype._file.path;
    get subpath(): typeof Filetype.prototype._file.subpath;
    get filename(): typeof Filetype.prototype._file.leaf;
    read(): ReturnType<typeof Filetype.prototype._file.read>;
    toString(): ReturnType<typeof Filetype.prototype.read>;
    private _utilityClassNameToBookmark;
}
//# sourceMappingURL=Filetype.d.ts.map
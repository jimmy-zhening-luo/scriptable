declare const _IOFile: typeof IOFile;
declare class ReadOnlyIOFile extends _IOFile {
    static get IOFile(): typeof IOFile;
    delete(): never;
    write(): never;
}
//# sourceMappingURL=ReadOnlyIOFile.d.ts.map
declare const stor_Filetype: typeof Filetype;
declare class Storage extends stor_Filetype {
    constructor(storageSubpath: string, programName: string, subpath?: string);
    static get Filetype(): typeof Filetype;
    write(text: string): this;
    delete(): Promise<this>;
}
//# sourceMappingURL=Storage.d.ts.map
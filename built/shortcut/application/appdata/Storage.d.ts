declare const STORAGE_DIR_SUBPATH_FROM_ROOT = "storage";
declare class Storage {
    readonly file: File;
    constructor(storageSubdirectoryPath: string, programName: string, subpath?: string);
    protected get storageDirFile(): File;
    protected get storageDirSubpathFromRoot(): string;
    get path(): string;
    get data(): string;
    read(): string;
    write(text: string): void;
    toString(): string;
}
//# sourceMappingURL=Storage.d.ts.map

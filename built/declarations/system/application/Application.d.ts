declare abstract class Application {
    static get Filetypes(): typeof Filetypes;
    get config(): Config;
    protected get configSubpathRoot(): string;
    protected get storageSubpathRoot(): typeof Application.prototype.configSubpathRoot;
    abstract get input(): unknown;
    run(): ReturnType<typeof Application.prototype.handleOutput>;
    readStorage(subpath?: string): ReturnType<typeof Storage.prototype.read>;
    writeStorage(data: string, subpath?: string): this;
    protected storage(subpath?: string): Storage;
    abstract runtime(): unknown;
    abstract handleOutput(output: ReturnType<typeof Application.prototype.runtime>): unknown;
}
//# sourceMappingURL=Application.d.ts.map
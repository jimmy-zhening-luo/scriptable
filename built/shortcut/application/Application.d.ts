declare const _Config: typeof Config;
declare const _Storage: typeof Storage;
declare abstract class Application {
    abstract get input(): any;
    abstract runtime(input: any): any;
    abstract handleOutput(output: any): any;
    run(): any;
    protected get configSubdirectoryPath(): string;
    protected get storageSubdirectoryPath(): string;
    get config(): Config;
    protected storage(subpath?: string | undefined): Storage;
    readStorage(subpath?: string | undefined): string;
    writeStorage(text: string, subpath?: string | undefined): void;
}
//# sourceMappingURL=Application.d.ts.map
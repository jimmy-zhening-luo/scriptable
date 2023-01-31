declare const _Application: typeof Application;
declare abstract class Shortcut extends Application {
    get input(): any;
    handleOutput(output: any): any;
    protected get configSubdirectoryPath(): string;
}
//# sourceMappingURL=Shortcut.d.ts.map
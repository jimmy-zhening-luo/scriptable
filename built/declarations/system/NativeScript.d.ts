declare const sc_Application: typeof Application;
declare abstract class NativeScript extends sc_Application {
    static get Application(): typeof Application;
    get input(): never;
    protected get configSubpathRoot(): string;
    handleOutput(): void;
}
//# sourceMappingURL=NativeScript.d.ts.map
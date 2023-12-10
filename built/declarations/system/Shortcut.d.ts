/// <reference types="scriptable" />
/// <reference types="shortcut-output" />
declare const sh_Application: typeof Application;
declare abstract class Shortcut extends sh_Application {
    static get Application(): typeof Application;
    get input(): typeof args;
    protected get configSubpathRoot(): string;
    handleOutput(output?: null | primitive | IOFile | ShortcutDictionary): primitive | ShortcutDictionary;
}
//# sourceMappingURL=Shortcut.d.ts.map
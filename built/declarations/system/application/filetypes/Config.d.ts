/// <reference types="shortcut-config" />
declare const cfg_Filetype: typeof Filetype;
declare class Config extends cfg_Filetype {
    constructor(configSubpath: string, programName: string);
    static get Filetype(): typeof Filetype;
    get isParseable(): boolean;
    get parsed(): ApplicationConfigProto;
    get unmerged(): ApplicationConfigProto;
    get app(): ApplicationConfigProto["app"];
    get user(): ApplicationConfigProto["user"];
    get merged(): Setting;
    get mergedUserOverridesProhibited(): Setting;
    protected mergeSettings(winningSettings: Setting | undefined, losingSettings: Setting | undefined): Setting;
    private _cachedConfig?;
}
//# sourceMappingURL=Config.d.ts.map
declare const CONFIG_DIR_SUBPATH_FROM_ROOT: string;
declare class Config {
    protected file: ReadOnlyFile;
    constructor(configSubdirectoryPath: string, programName: string);
    protected get configDirFile(): File;
    protected get configDirSubpathFromRoot(): string;
    get path(): string;
    get isParseable(): boolean;
    get parsed(): Config.ConfigObject;
    get unmerged(): Config.ConfigObject;
    get app(): Config.Settings | undefined;
    get user(): Config.Settings | undefined;
    get merged(): Config.SettingValue;
    get mergedUserOverridesProhibited(): Config.SettingValue;
    toString(): string;
    protected mergeSettings(winningSettings: Config.Settings | undefined, losingSettings: Config.Settings | undefined): Config.Settings;
}
declare namespace Config {
    type ConfigObject = (AppSection & UserSection);
    interface AppSection {
        "app"?: Settings;
    }
    interface UserSection {
        "user"?: Settings;
    }
    interface Settings {
        [key: string]: SettingValue;
    }
    type SettingValue = (primitive | Array<SettingValue> | Settings);
    type primitive = (string | number | boolean);
}
//# sourceMappingURL=Config.d.ts.map
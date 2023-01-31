const CONFIG_DIR_SUBPATH_FROM_ROOT: string = "config";

class Config {
  protected file: ReadOnlyFile;
  constructor(
    configSubdirectoryPath: string,
    programName: string
  ) {
    this.file = new ReadOnlyFile(
      this.configDirFile as ReadOnlyFile,
      File.joinPaths(
        configSubdirectoryPath,
        [programName, "json"]
          .join(".")
      )
    );
  }

  protected get configDirFile(): File {
    return new File(new Bookmark(Installer.runtimeRootBookmarkName), this.configDirSubpathFromRoot);
  }

  protected get configDirSubpathFromRoot(): string {
    return CONFIG_DIR_SUBPATH_FROM_ROOT;
  }

  get path(): string {
    return this.file.path as string;
  }

  get isParseable(): boolean {
    try {
      JSON.parse(this.file.data as string);
      return true;
    } catch (e) {
      return false;
    }
  }

  get parsed(): Config.ConfigObject {
    return this.isParseable ?
      JSON.parse(this.file.data as string)
      : {}
  }

  get unmerged(): Config.ConfigObject {
    return this.parsed;
  }

  get app(): Config.Settings | undefined {
    return this.unmerged.app;
  }

  get user(): Config.Settings | undefined {
    return this.unmerged.user;
  }

  get merged(): Config.SettingValue {
    return this.mergeSettings(
      this.user,
      this.app
    );
  }

  get mergedUserOverridesProhibited(): Config.SettingValue {
    return this.mergeSettings(
      this.app,
      this.user
    );
  }

  toString(): string {
    return this.file.data as string;
  }

  protected mergeSettings(
    winningSettings: Config.Settings | undefined,
    losingSettings: Config.Settings | undefined
  ): Config.Settings {
    if (winningSettings === undefined && losingSettings !== undefined)
      return losingSettings;
    else if (losingSettings === undefined && winningSettings !== undefined)
      return winningSettings;
    else if (losingSettings !== undefined && winningSettings !== undefined) {
      const commonSettingKeys: Array<string> = intersectKeys(
        winningSettings,
        losingSettings
      );
      const keysUniqueToWinningSettings: Array<string> = uniqueKeysOf(
        winningSettings,
        commonSettingKeys
      );
      const keysUniqueToLosingSettings: Array<string> = uniqueKeysOf(
        losingSettings,
        commonSettingKeys
      );
      const mergedSettingsMap = new Map<string, Config.SettingValue>();
      for (const loser of keysUniqueToLosingSettings)
        mergedSettingsMap.set(
          loser,
          losingSettings[loser] as Config.SettingValue
        );
      for (const winner of keysUniqueToWinningSettings)
        mergedSettingsMap.set(
          winner,
          winningSettings[winner] as Config.SettingValue
        );
      for (const key of commonSettingKeys) {
        if (isPrimitive(winningSettings[key] as Config.SettingValue)
          && isPrimitive(losingSettings[key] as Config.SettingValue)
        )
          mergedSettingsMap.set(
            key,
            winningSettings[key] as Config.primitive
          );
        else if (Array.isArray(winningSettings[key])
          && Array.isArray(losingSettings[key])
        )
          mergedSettingsMap.set(
            key,
            mergeArrays(
              winningSettings[key] as Array<Config.SettingValue>,
              losingSettings[key] as Array<Config.SettingValue>
            )
          );
        else if (Array.isArray(winningSettings[key]))
          mergedSettingsMap.set(
            key,
            mergeArrays(
              winningSettings[key] as Array<Config.SettingValue>,
              [losingSettings[key] as Config.SettingValue]
            )
          );
        else if (Array.isArray(losingSettings[key]))
          mergedSettingsMap.set(
            key,
            mergeArrays(
              [winningSettings[key] as Config.SettingValue],
              losingSettings[key] as Array<Config.SettingValue>
            )
          );
        else
          mergedSettingsMap.set(
            key,
            this.mergeSettings(
              winningSettings[key] as Config.Settings,
              losingSettings[key] as Config.Settings
            )
          );
      }
      return Object.fromEntries(mergedSettingsMap);
    }
    else
      return {};

    function isPrimitive(
      obj: Config.SettingValue
    ): boolean {
      return (
        obj?.constructor === String
        || obj?.constructor === Number
        || obj?.constructor === Boolean
      );
    }
    function mergeArrays(
      winner: Array<Config.SettingValue>,
      loser: Array<Config.SettingValue>
    ): Array<Config.SettingValue> {
      return winner.concat(loser);
    }
    function intersectKeys(
      a: Config.Settings,
      b: Config.Settings
    ): Array<string> {
      return Object.keys(a)
        .filter(
          (aKey: string) => (
            Object.keys(b).includes(aKey)
          )
        );
    }
    function uniqueKeysOf(
      obj: Config.Settings,
      commonSettingKeys: Array<string>
    ): Array<string> {
      return Object.keys(obj)
        .filter(
          (objKey: string) => (
            !commonSettingKeys.includes(objKey)
          )
        );
    }
  }
}

namespace Config {
  export type ConfigObject = (
    AppSection
    & UserSection
  );

  export interface AppSection {
    "app"?: Settings
  }

  export interface UserSection {
    "user"?: Settings
  }

  export interface Settings {
    [key: string]: SettingValue
  };

  export type SettingValue = (
    primitive
    | Array<SettingValue>
    | Settings
  );

  export type primitive = (
    string
    | number
    | boolean
  );
}

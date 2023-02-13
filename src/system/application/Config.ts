const CONFIG_BOOKMARK: string = "#Config";

class Config {
  protected file: ReadOnlyFile;
  constructor(
    configSubpath: string,
    programName: string
  ) {
    this.file = new Config.ReadOnlyFile(
      this.configDirFile,
      Config.Paths.joinPaths(
        configSubpath,
        [
          programName,
          "json"
        ]
          .join(".")
      )
    );
  }

  protected get configDirFile(): ReadOnlyFile {
    return new Config.ReadOnlyFile(
      new Config.ReadOnlyFile.Bookmark(
        this.configBookmark
      )
    );
  }

  protected get configBookmark(): string {
    return CONFIG_BOOKMARK;
  }

  get path(): string {
    return this.file.path as string;
  }

  get isParseable(): boolean {
    try {
      JSON.parse(
        this.file.data
      );
      return true;
    } catch {
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
    winningSettings:
      | Config.Settings
      | undefined,
    losingSettings:
      | Config.Settings
      | undefined
  ): Config.Settings {
    if (
      winningSettings === undefined
      && losingSettings !== undefined
    )
      return losingSettings;
    else if (
      losingSettings === undefined
      && winningSettings !== undefined
    )
      return winningSettings;
    else if (
      losingSettings !== undefined
      && winningSettings !== undefined
    ) {
      const commonSettingKeys: string[] = intersectKeys(
        winningSettings,
        losingSettings
      );
      const keysUniqueToWinningSettings: string[] = uniqueKeysOf(
        winningSettings,
        commonSettingKeys
      );
      const keysUniqueToLosingSettings: string[] = uniqueKeysOf(
        losingSettings,
        commonSettingKeys
      );
      const mergedSettingsMap:
        Map<
          Types.stringful,
          Config.SettingValue
        > = new Map();
      for (const loser of keysUniqueToLosingSettings)
        mergedSettingsMap.set(
          loser,
          losingSettings[loser]
        );
      for (const winner of keysUniqueToWinningSettings)
        mergedSettingsMap.set(
          winner,
          winningSettings[winner]
        );
      for (const key of commonSettingKeys) {
        if (
          isPrimitive(winningSettings[key])
          && isPrimitive(losingSettings[key])
        )
          mergedSettingsMap.set(
            key,
            winningSettings[key]
          );
        else if (
          Array.isArray(winningSettings[key])
          && Array.isArray(losingSettings[key])
        )
          mergedSettingsMap.set(
            key,
            mergeArrays(
              winningSettings[key] as Config.SettingValue[],
              losingSettings[key] as Config.SettingValue[]
            )
          );
        else if (Array.isArray(winningSettings[key]))
          mergedSettingsMap.set(
            key,
            mergeArrays(
              winningSettings[key] as Config.SettingValue[],
              [losingSettings[key] as Config.SettingValue]
            )
          );
        else if (Array.isArray(losingSettings[key]))
          mergedSettingsMap.set(
            key,
            mergeArrays(
              [winningSettings[key] as Config.SettingValue],
              losingSettings[key] as Config.SettingValue[]
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
      return Object.fromEntries(
        mergedSettingsMap
      );
    }
    else
      return {};

    function isPrimitive(
      obj: Config.SettingValue
    ): boolean {
      return typeof obj === "string"
        || typeof obj === "number"
        || typeof obj === "boolean";
    }

    function mergeArrays(
      winner: Config.SettingValue[],
      loser: Config.SettingValue[]
    ): Config.SettingValue[] {
      return winner
        .concat(
          loser
        );
    }

    function intersectKeys(
      a: Config.Settings,
      b: Config.Settings
    ): string[] {
      return Object
        .keys(a)
        .filter(keyOfA => Object
          .keys(b)
          .includes(keyOfA)
        );
    }

    function uniqueKeysOf(
      obj: Config.Settings,
      sharedKeys: string[]
    ): string[] {
      return Object
        .keys(obj)
        .filter(objKey => !sharedKeys
          .includes(objKey)
        );
    }
  }

  get ReadOnlyFile(): typeof ReadOnlyFile {
    return Config.ReadOnlyFile;
  }

  get Paths(): typeof Paths {
    return Config.Paths;
  }

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    return importModule("files/ReadOnlyFile");
  }

  static get Paths(): typeof Paths {
    return Config.ReadOnlyFile.Paths;
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
    Types.primitive
    | Array<SettingValue>
    | Settings
  );

}

module.exports = Config;

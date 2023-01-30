type ConfigObject = (
  AppSection
  & UserSection
);

interface AppSection {
  "app"?: Settings
}

interface UserSection {
  "user"?: Settings
}

interface Settings {
  [key: string]: SettingValue
};

type SettingValue = (
  primitive
  | Array<SettingValue>
  | Settings
);

type primitive = (
  string
  | number
  | boolean
);

class Config {
  protected file: typeof Config.ReadOnlyFile;
  constructor(
    configSubdirectoryPath: string,
    programName: string
  ) {
    this.file = new Config.ReadOnlyFile(
      Config.System.configRuntimeDir as string,
      Config.ReadOnlyFile.joinPaths(
        configSubdirectoryPath,
        [programName, "json"]
          .join(".")
      ) as string
    );
  }

  private static get System() {
    return importModule("./system/System");
  }

  private static get ReadOnlyFile() {
    return Config.System.ReadOnlyFile;
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

  get parsed(): ConfigObject {
    return this.isParseable ?
      JSON.parse(this.file.data as string)
      : {}
  }

  get unmerged(): ConfigObject {
    return this.parsed;
  }

  get app(): Settings | undefined {
    return this.unmerged.app;
  }

  get user(): Settings | undefined {
    return this.unmerged.user;
  }

  get merged(): SettingValue {
    return Config.mergeSettings(
      this.user,
      this.app
    );
  }

  get mergedUserOverridesProhibited(): SettingValue {
    return Config.mergeSettings(
      this.app,
      this.user
    );
  }

  toString(): string {
    return this.file.data as string;
  }

  static mergeSettings(
    winningSettings: Settings | undefined,
    losingSettings: Settings | undefined
  ): Settings {
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
      const mergedSettingsMap = new Map<string, SettingValue>();
      for (const loser of keysUniqueToLosingSettings)
        mergedSettingsMap.set(
          loser,
          losingSettings[loser] as SettingValue
        );
      for (const winner of keysUniqueToWinningSettings)
        mergedSettingsMap.set(
          winner,
          winningSettings[winner] as SettingValue
        );
      for (const key of commonSettingKeys) {
        if (isPrimitive(winningSettings[key] as SettingValue)
          && isPrimitive(losingSettings[key] as SettingValue)
        )
          mergedSettingsMap.set(
            key,
            winningSettings[key] as primitive
          );
        else if (Array.isArray(winningSettings[key])
          && Array.isArray(losingSettings[key])
        )
          mergedSettingsMap.set(
            key,
            mergeArrays(
              winningSettings[key] as Array<SettingValue>,
              losingSettings[key] as Array<SettingValue>
            )
          );
        else if (Array.isArray(winningSettings[key]))
          mergedSettingsMap.set(
            key,
            mergeArrays(
              winningSettings[key] as Array<SettingValue>,
              [losingSettings[key] as SettingValue]
            )
          );
        else if (Array.isArray(losingSettings[key]))
          mergedSettingsMap.set(
            key,
            mergeArrays(
              [winningSettings[key] as SettingValue],
              losingSettings[key] as Array<SettingValue>
            )
          );
        else
          mergedSettingsMap.set(
            key,
            Config.mergeSettings(
              winningSettings[key] as Settings,
              losingSettings[key] as Settings
            )
          );
      }
      return Object.fromEntries(mergedSettingsMap);
    }
    else
      return {};

    function isPrimitive(
      obj: SettingValue
    ): boolean {
      return (
        obj?.constructor === String
        || obj?.constructor === Number
        || obj?.constructor === Boolean
      );
    }
    function mergeArrays(
      winner: Array<SettingValue>,
      loser: Array<SettingValue>
    ): Array<SettingValue> {
      return winner.concat(loser);
    }
    function intersectKeys(
      a: Settings,
      b: Settings
    ): Array<string> {
      return Object.keys(a)
        .filter(
          (aKey: string) => (
            Object.keys(b).includes(aKey)
          )
        );
    }
    function uniqueKeysOf(
      obj: Settings,
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

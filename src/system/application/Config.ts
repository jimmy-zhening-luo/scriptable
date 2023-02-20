const CONFIG_BOOKMARK: string = "#Config";

class Config {
  protected file: ReadOnlyFile;
  constructor(
    configSubpath: string,
    programName: string
  ) {
    this.file = new Config.ReadOnlyFile(
      this.configDirFile,
      this.ReadOnlyFile.join(
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

  get parsed(): ShortcutConfigProto {
    return this.isParseable ?
      JSON.parse(this.file.data as string)
      : {}
  }

  get unmerged(): ShortcutConfigProto {
    return this.parsed;
  }

  get app(): ShortcutConfigProto["app"] | undefined {
    return this.unmerged.app;
  }

  get user(): ShortcutConfigProto["user"] | undefined {
    return this.unmerged.user;
  }

  get merged(): Setting {
    return this.mergeSettings(
      this.user,
      this.app
    );
  }

  get mergedUserOverridesProhibited(): Setting {
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
      | Setting
      | undefined,
    losingSettings:
      | Setting
      | undefined
  ): Setting {
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
          string,
          SettingValue
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
              winningSettings[key] as SettingValue[],
              losingSettings[key] as SettingValue[]
            )
          );
        else if (Array.isArray(winningSettings[key]))
          mergedSettingsMap.set(
            key,
            mergeArrays(
              winningSettings[key] as SettingValue[],
              [losingSettings[key] as SettingValue]
            )
          );
        else if (Array.isArray(losingSettings[key]))
          mergedSettingsMap.set(
            key,
            mergeArrays(
              [winningSettings[key] as SettingValue],
              losingSettings[key] as SettingValue[]
            )
          );
        else
          mergedSettingsMap.set(
            key,
            this.mergeSettings(
              winningSettings[key] as Setting,
              losingSettings[key] as Setting
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
      obj: SettingValue
    ): boolean {
      return typeof obj === "string"
        || typeof obj === "number"
        || typeof obj === "boolean";
    }

    function mergeArrays(
      winner: SettingValue[],
      loser: SettingValue[]
    ): SettingValue[] {
      return winner
        .concat(
          loser
        );
    }

    function intersectKeys(
      a: Setting,
      b: Setting
    ): string[] {
      return Object
        .keys(a)
        .filter(keyOfA => Object
          .keys(b)
          .includes(keyOfA)
        );
    }

    function uniqueKeysOf(
      obj: Setting,
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

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    return importModule("files/ReadOnlyFile");
  }

}

module.exports = Config;

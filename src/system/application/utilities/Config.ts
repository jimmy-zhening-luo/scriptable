const co_Utility: typeof Utility = importModule("utility/Utility");

class Config extends co_Utility {
  constructor(configSubpath: string, programName: string) {
    super(
      "Config",
      Config.ReadOnlyFile,
      Config.ReadOnlyFile.join(configSubpath, [programName, "json"].join(".")),
    );
  }

  get isParseable(): boolean {
    try {
      if (!this._file.exists)
        throw new ReferenceError(
          `Config.js: Config file '${this._file.path}' does not exist.`,
        );
      else {
        JSON.parse(this._file.data);
        return true;
      }
    } catch {
      return false;
    }
  }

  get parsed(): ShortcutConfigProto {
    try {
      if (!this.isParseable)
        throw new SyntaxError(
          `Config.js: Config file '${this._file.path}' is not parseable as JSON.`,
        );
      else return JSON.parse(this._file.data);
    } catch (e) {
      console.error(
        `Config.js: Error parsing config file '${this._file.path}': ${e}`,
      );
      throw e;
    }
  }

  get unmerged(): ShortcutConfigProto {
    return this.parsed;
  }

  get app(): ShortcutConfigProto["app"] {
    try {
      if (this.unmerged.app === undefined)
        throw new ReferenceError(
          `Config.js: Config file '${this._file.path}' does not contain an 'app' property.`,
        );
      else return this.unmerged.app;
    } catch (e) {
      console.error(
        `Config.js: Error getting 'app' property from config file '${this._file.path}': ${e}`,
      );
      throw e;
    }
  }

  get user(): ShortcutConfigProto["user"] {
    try {
      if (this.unmerged.user === undefined)
        throw new ReferenceError(
          `Config.js: Config file '${this._file.path}' does not contain a 'user' property.`,
        );
      else return this.unmerged.user;
    } catch (e) {
      console.error(
        `Config.js: Error getting 'user' property from config file '${this._file.path}': ${e}`,
      );
      throw e;
    }
  }

  get merged(): Setting {
    return this.mergeSettings(this.user, this.app);
  }

  get mergedUserOverridesProhibited(): Setting {
    return this.mergeSettings(this.app, this.user);
  }

  protected mergeSettings(
    winningSettings: Setting | undefined,
    losingSettings: Setting | undefined,
  ): Setting {
    if (winningSettings === undefined && losingSettings !== undefined)
      return losingSettings;
    else if (losingSettings === undefined && winningSettings !== undefined)
      return winningSettings;
    else if (losingSettings !== undefined && winningSettings !== undefined) {
      const commonSettingKeys: string[] = intersectKeys(
        winningSettings,
        losingSettings,
      );
      const keysUniqueToWinningSettings: string[] = uniqueKeysOf(
        winningSettings,
        commonSettingKeys,
      );
      const keysUniqueToLosingSettings: string[] = uniqueKeysOf(
        losingSettings,
        commonSettingKeys,
      );
      const mergedSettingsMap: Map<string, SettingValue> = new Map();
      const losingSettingsMap: Map<string, SettingValue> = new Map(
        Object.entries(losingSettings),
      );
      const winningSettingsMap: Map<string, SettingValue> = new Map(
        Object.entries(winningSettings),
      );

      for (const loser of keysUniqueToLosingSettings)
        mergedSettingsMap.set(loser, losingSettingsMap.get(loser)!);
      for (const winner of keysUniqueToWinningSettings)
        mergedSettingsMap.set(winner, winningSettingsMap.get(winner)!);
      for (const key of commonSettingKeys) {
        if (
          isPrimitive(winningSettingsMap.get(key)!) &&
          isPrimitive(losingSettingsMap.get(key)!)
        )
          mergedSettingsMap.set(key, winningSettingsMap.get(key)!);
        else if (
          Array.isArray(winningSettingsMap.get(key)) &&
          Array.isArray(losingSettingsMap.get(key))
        )
          mergedSettingsMap.set(
            key,
            mergeArrays(
              winningSettingsMap.get(key) as SettingValue[],
              losingSettingsMap.get(key) as SettingValue[],
            ),
          );
        else if (Array.isArray(winningSettingsMap.get(key)))
          mergedSettingsMap.set(
            key,
            mergeArrays(winningSettingsMap.get(key) as SettingValue[], [
              losingSettingsMap.get(key)!,
            ]),
          );
        else if (Array.isArray(losingSettingsMap.get(key)))
          mergedSettingsMap.set(
            key,
            mergeArrays(
              [winningSettingsMap.get(key)!],
              losingSettingsMap.get(key) as SettingValue[],
            ),
          );
        else
          mergedSettingsMap.set(
            key,
            this.mergeSettings(
              winningSettingsMap.get(key) as Setting,
              losingSettingsMap.get(key) as Setting,
            ),
          );
      }
      return Object.fromEntries(mergedSettingsMap);
    } else return {};

    function isPrimitive(obj: SettingValue): boolean {
      return (
        typeof obj === "string" ||
        typeof obj === "number" ||
        typeof obj === "boolean"
      );
    }

    function mergeArrays(
      winner: SettingValue[],
      loser: SettingValue[],
    ): SettingValue[] {
      return winner.concat(loser);
    }

    function intersectKeys(a: Setting, b: Setting): string[] {
      return Object.keys(a).filter(keyOfA => Object.keys(b).includes(keyOfA));
    }

    function uniqueKeysOf(obj: Setting, sharedKeys: string[]): string[] {
      return Object.keys(obj).filter(objKey => !sharedKeys.includes(objKey));
    }
  }

  get ReadOnlyFile(): typeof ReadOnlyFile {
    return Config.ReadOnlyFile;
  }
}

module.exports = Config;

const co_Utility: typeof Utility = importModule("utility/Utility");

class Config extends co_Utility {

  private readonly _APPLICATION_CONFIG_BOOKMARK: string = "@_APPLICATION_CONFIG";

  protected file: ReadOnlyFile;

  constructor(
    configSubpath: string,
    programName: string
  ) {
    super();
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

  private get configBookmark(): string {
    return this.applicationConfig.Config;
  }

  private get applicationConfigBookmark(): string {
    try {
      if (!FileManager.iCloud().bookmarkExists(this._APPLICATION_CONFIG_BOOKMARK))
        throw new ReferenceError(`Config.js: Application config bookmark '${this._APPLICATION_CONFIG_BOOKMARK}' does not exist in Scriptable. Check your application bookmark name and make sure that bookmark is created in Scriptable.`);
      else if (!FileManager.iCloud().fileExists(FileManager.iCloud().bookmarkedPath(this._APPLICATION_CONFIG_BOOKMARK)))
        throw new ReferenceError(`Config.js: Application config bookmark '${this._APPLICATION_CONFIG_BOOKMARK}' is an existing bookmark in Scriptable. However, the bookmark maps to a filepath that does not exist. Check your bookmark configuration in Scriptable to make sure that the bookmark maps to a valid filepath. It must map to the .json config file itself, not to a directory.`);
      return this._APPLICATION_CONFIG_BOOKMARK;
    } catch (e) {
      console.error(`Config.js: Error getting preconfigured application config bookmark '${this._APPLICATION_CONFIG_BOOKMARK}': ${e}`);
      throw e;
    }
  }

  get isParseable(): boolean {
    try {
      if (!this.file.exists)
        throw new ReferenceError(`Config.js: Config file '${this.file.path}' does not exist.`);
      JSON.parse(
        this.file.data
      );
      return true;
    } catch {
      return false;
    }
  }

  get parsed(): ShortcutConfigProto {
    try {
      if (!this.isParseable)
        throw new SyntaxError(`Config.js: Config file '${this.file.path}' is not parseable as JSON.`);
      return JSON.parse(this.file.data);
    } catch (e) {
      console.error(`Config.js: Error parsing config file '${this.file.path}': ${e}`);
      throw e;
    }
  }

  get unmerged(): ShortcutConfigProto {
    return this.parsed;
  }

  get app(): ShortcutConfigProto["app"] {
    try {
      if (this.unmerged.app === undefined)
        throw new ReferenceError(`Config.js: Config file '${this.file.path}' does not contain an 'app' property.`);
      return this.unmerged.app;
    } catch (e) {
      console.error(`Config.js: Error getting 'app' property from config file '${this.file.path}': ${e}`);
      throw e;
    }
  }

  get user(): ShortcutConfigProto["user"] {
    try {
      if (this.unmerged.user === undefined)
        throw new ReferenceError(`Config.js: Config file '${this.file.path}' does not contain a 'user' property.`);
      return this.unmerged.user;
    } catch (e) {
      console.error(`Config.js: Error getting 'user' property from config file '${this.file.path}': ${e}`);
      throw e;
    }
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

}

module.exports = Config;

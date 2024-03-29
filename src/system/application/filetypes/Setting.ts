const set_Filetype: typeof Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Setting<C extends Config = Record<string, never>> extends set_Filetype {
  constructor(
    settingSubpath: string,
    programName: string,
  ) {
    try {
      super(
        "Setting",
        Setting.IOFile.join(
          settingSubpath,
          `${programName}.json`,
        ),
      );
    }
    catch (e) {
      throw new EvalError(
        `Setting: constructor: Error creating Setting object: \n${e as string}`,
      );
    }
  }

  public static get Filetype(): typeof Filetype {
    try {
      return set_Filetype;
    }
    catch (e) {
      throw new ReferenceError(
        `Setting: Error importing Utility module: \n${e as string}`,
      );
    }
  }

  public get isParseable(): boolean {
    try {
      if (!this.isFile)
        throw new ReferenceError(
          `Setting.js: Setting file '${this.path}' does not exist.`,
        );
      else {
        JSON.parse(this.read());

        return true;
      }
    }
    catch {
      return false;
    }
  }

  public get parsed(): C {
    try {
      if (this._cachedSetting !== undefined) return this._cachedSetting;
      else {
        if (!this.isParseable)
          throw new SyntaxError(
            `Setting.js: Setting file '${this.path}' is not parseable as JSON.`,
          );
        else {
          const parsedJson: unknown = JSON.parse(this.read());

          if (_validate(parsedJson)) {
            this._cachedSetting = parsedJson as C;

            return this._cachedSetting;
          }
          else
            throw new SyntaxError(
              `Setting.js: Setting file '${this.path}' is valid JSON but not a valid ApplicationSettings file.`,
            );

          function _validate(parsedJson: unknown): boolean {
            try {
              // TO-DO: Validate JSON schema.
              return parsedJson !== undefined;
            }
            catch (e) {
              throw new EvalError(
                `Setting.js: Error while validating whether parsed JSON matches expected ApplicationSettings file: \n${e as string}`,
              );
            }
          }
        }
      }
    }
    catch (e) {
      throw new EvalError(
        `Setting.js: Error while parsing setting file '${this.path}': \n${e as string}`,
      );
    }
  }

  public get unmerged(): C {
    try {
      return this.parsed;
    }
    catch (e) {
      throw new EvalError(
        `Setting.js: Error getting unmerged setting file '${this.path}': \n${e as string}`,
      );
    }
  }

  public get app(): C["app"] {
    try {
      if (this.unmerged.app === undefined)
        throw new ReferenceError(
          `Setting.js: Setting file '${this.path}' does not contain an 'app' property.`,
        );
      else return this.unmerged.app;
    }
    catch (e) {
      throw new EvalError(
        `Setting.js: Error getting 'app' property from setting file '${this.path}': \n${e as string}`,
      );
    }
  }

  public get user(): C["user"] {
    try {
      if (this.unmerged.user === undefined)
        throw new ReferenceError(
          `Setting.js: Setting file '${this.path}' does not contain a 'user' property.`,
        );
      else return this.unmerged.user;
    }
    catch (e) {
      throw new EvalError(
        `Setting.js: Error getting 'user' property from setting file '${this.path}': \n${e as string}`,
      );
    }
  }

  public get merged(): SettingMap {
    try {
      return this.mergeSettings(this.user, this.app);
    }
    catch (e) {
      throw new EvalError(
        `Setting.js: Error merging 'user' and 'app' properties from setting file '${this.path}': \n${e as string}`,
      );
    }
  }

  public get mergedUserOverridesProhibited(): SettingMap {
    try {
      return this.mergeSettings(this.app, this.user);
    }
    catch (e) {
      throw new EvalError(
        `Setting.js: Error merging 'user' and 'app' properties from setting file '${this.path}': \n${e as string}`,
      );
    }
  }

  protected mergeSettings(
    winningSettings: SettingMap | undefined,
    losingSettings: SettingMap | undefined,
  ): SettingMap {
    try {
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
            isPrimitive(winningSettingsMap.get(key)!)
            && isPrimitive(losingSettingsMap.get(key)!)
          )
            mergedSettingsMap.set(key, winningSettingsMap.get(key)!);
          else if (
            Array.isArray(winningSettingsMap.get(key))
            && Array.isArray(losingSettingsMap.get(key))
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
              mergeArrays(
                winningSettingsMap.get(key) as SettingValue[],
                [losingSettingsMap.get(key)!],
              ),
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
                winningSettingsMap.get(key) as SettingMap,
                losingSettingsMap.get(key) as SettingMap,
              ),
            );
        }

        return Object.fromEntries(mergedSettingsMap);
      }
      else return {};
    }
    catch (e) {
      throw new SyntaxError(
        `Setting.js: Error merging settings from setting file '${this.path}': \n${e as string}`,
      );
    }

    function isPrimitive(obj: SettingValue): boolean {
      try {
        return (
          typeof obj === "string"
          || typeof obj === "number"
          || typeof obj === "boolean"
        );
      }
      catch (e) {
        throw new EvalError(
          `Setting.js: Error determining whether object is primitive: \n${e as string}`,
        );
      }
    }

    function mergeArrays(
      winner: SettingValue[],
      loser: SettingValue[],
    ): SettingValue[] {
      try {
        return winner.concat(loser);
      }
      catch (e) {
        throw new EvalError(`Setting.js: Error merging arrays: \n${e as string}`);
      }
    }

    function intersectKeys(a: SettingMap, b: SettingMap): string[] {
      try {
        return Object.keys(a)
          .filter(keyOfA => Object.keys(b)
            .includes(keyOfA));
      }
      catch (e) {
        throw new EvalError(`Setting.js: Error intersecting keys: \n${e as string}`);
      }
    }

    function uniqueKeysOf(obj: SettingMap, sharedKeys: string[]): string[] {
      try {
        return Object.keys(obj)
          .filter(objKey => !sharedKeys.includes(objKey));
      }
      catch (e) {
        throw new EvalError(
          `Setting.js: Error getting unique keys of object: \n${e as string}`,
        );
      }
    }
  }

  private _cachedSetting?: C;
}

module.exports = Setting;

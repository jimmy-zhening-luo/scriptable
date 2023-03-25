const co_Utility: typeof Utility = importModule("utility/Utility");

class Config extends co_Utility {
  constructor(configSubpath: string, programName: string) {
    try {
      super("Config", Config.File.join(configSubpath, `${programName}.json`));
    } catch (e) {
      throw new EvalError(
        `Config: constructor: Error creating Config object: \n${e}`,
      );
    }
  }

  get isParseable(): boolean {
    try {
      if (!this.isFile)
        throw new ReferenceError(
          `Config.js: Config file '${this.path}' does not exist.`,
        );
      else {
        JSON.parse(this.read());
        return true;
      }
    } catch {
      return false;
    }
  }

  get parsed(): ApplicationConfigProto {
    try {
      if (!this.isParseable)
        throw new SyntaxError(
          `Config.js: Config file '${this.path}' is not parseable as JSON.`,
        );
      else return JSON.parse(this.read());
    } catch (e) {
      throw new SyntaxError(
        `Config.js: Error parsing config file '${this.path}': \n${e}`,
      );
    }
  }

  get unmerged(): ApplicationConfigProto {
    try {
      return this.parsed;
    } catch (e) {
      throw new SyntaxError(
        `Config.js: Error getting unmerged config file '${this.path}': \n${e}`,
      );
    }
  }

  get app(): ApplicationConfigProto["app"] {
    try {
      if (this.unmerged.app === undefined)
        throw new ReferenceError(
          `Config.js: Config file '${this.path}' does not contain an 'app' property.`,
        );
      else return this.unmerged.app;
    } catch (e) {
      throw new SyntaxError(
        `Config.js: Error getting 'app' property from config file '${this.path}': \n${e}`,
      );
    }
  }

  get user(): ApplicationConfigProto["user"] {
    try {
      if (this.unmerged.user === undefined)
        throw new ReferenceError(
          `Config.js: Config file '${this.path}' does not contain a 'user' property.`,
        );
      else return this.unmerged.user;
    } catch (e) {
      throw new SyntaxError(
        `Config.js: Error getting 'user' property from config file '${this.path}': \n${e}`,
      );
    }
  }

  get merged(): Setting {
    try {
      return this.mergeSettings(this.user, this.app);
    } catch (e) {
      throw new SyntaxError(
        `Config.js: Error merging 'user' and 'app' properties from config file '${this.path}': \n${e}`,
      );
    }
  }

  get mergedUserOverridesProhibited(): Setting {
    try {
      return this.mergeSettings(this.app, this.user);
    } catch (e) {
      throw new SyntaxError(
        `Config.js: Error merging 'user' and 'app' properties from config file '${this.path}': \n${e}`,
      );
    }
  }

  protected mergeSettings(
    winningSettings: Setting | undefined,
    losingSettings: Setting | undefined,
  ): Setting {
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
    } catch (e) {
      throw new SyntaxError(
        `Config.js: Error merging settings from config file '${this.path}': \n${e}`,
      );
    }

    function isPrimitive(obj: SettingValue): boolean {
      try {
        return (
          typeof obj === "string" ||
          typeof obj === "number" ||
          typeof obj === "boolean"
        );
      } catch (e) {
        throw new EvalError(
          `Config.js: Error determining if object is primitive: \n${e}`,
        );
      }
    }

    function mergeArrays(
      winner: SettingValue[],
      loser: SettingValue[],
    ): SettingValue[] {
      try {
        return winner.concat(loser);
      } catch (e) {
        throw new EvalError(`Config.js: Error merging arrays: \n${e}`);
      }
    }

    function intersectKeys(a: Setting, b: Setting): string[] {
      try {
        return Object.keys(a).filter(keyOfA => Object.keys(b).includes(keyOfA));
      } catch (e) {
        throw new EvalError(`Config.js: Error intersecting keys: \n${e}`);
      }
    }

    function uniqueKeysOf(obj: Setting, sharedKeys: string[]): string[] {
      try {
        return Object.keys(obj).filter(objKey => !sharedKeys.includes(objKey));
      } catch (e) {
        throw new EvalError(
          `Config.js: Error getting unique keys of object: \n${e}`,
        );
      }
    }
  }

  static get Utility(): typeof Utility {
    try {
      return co_Utility;
    } catch (e) {
      throw new ReferenceError(
        `Config: Error importing Utility module: \n${e}`,
      );
    }
  }
}

module.exports = Config;

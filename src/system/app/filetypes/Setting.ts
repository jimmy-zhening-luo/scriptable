const set_Filetype: typeof Filetype = importModule(
  "filetype/Filetype",
) as typeof Filetype;

class Setting<
  C extends Config = Record<string, never>,
> extends set_Filetype<
  "Setting"
> {
  constructor(
    appType: string,
    appName: string,
  ) {
    try {
      super(
        "Setting",
        Setting.ReadOnlyIOFile,
        appType,
        appName + ".json",
      );
    }
    catch (e) {
      throw new EvalError(
        `Setting: ctor: \n${e as string}`,
      );
    }
  }

  public get parsed(): C {
    try {
      if (this._cachedSetting !== undefined) return this._cachedSetting;
      else {
        if (!this._file.isFile)
          throw new SyntaxError(
            `setting file does not exist`,
          );
        else {
          const parsedJson: unknown = JSON.parse(this.read());

          if (_validate(parsedJson)) {
            this._cachedSetting = parsedJson as C;

            return this._cachedSetting;
          }
          else
            throw new SyntaxError(
              `setting file is valid JSON, but invalid setting schema`,
            );

          function _validate(parsedJson: unknown): boolean {
            try {
              // TO-DO: Validate JSON schema.
              return parsedJson !== undefined;
            }
            catch (e) {
              throw new EvalError(
                `_validate: \n${e as string}`,
              );
            }
          }
        }
      }
    }
    catch (e) {
      throw new EvalError(
        `Setting: parsed: \n${e as string}`,
      );
    }
  }

  public get unmerged(): C {
    try {
      return this.parsed;
    }
    catch (e) {
      throw new EvalError(
        `Setting: unmerged: \n${e as string}`,
      );
    }
  }

  public get app(): C["app"] {
    try {
      if (this.unmerged.app === undefined)
        throw new ReferenceError(
          `no app setting found`,
        );
      else return this.unmerged.app;
    }
    catch (e) {
      throw new EvalError(
        `Setting: app: \n${e as string}`,
      );
    }
  }

  public get user(): C["user"] {
    try {
      if (this.unmerged.user === undefined)
        throw new ReferenceError(
          `no user setting found`,
        );
      else return this.unmerged.user;
    }
    catch (e) {
      throw new EvalError(
        `Setting: user: \n${e as string}`,
      );
    }
  }

  public get merged(): SettingMap {
    try {
      return this.mergeSettings(
        this.user,
        this.app,
      );
    }
    catch (e) {
      throw new EvalError(
        `Setting: merged: \n${e as string}`,
      );
    }
  }

  public get mergedNoOverride(): SettingMap {
    try {
      return this.mergeSettings(
        this.app,
        this.user,
      );
    }
    catch (e) {
      throw new EvalError(
        `Setting: mergedNoOverride: \n${e as string}`,
      );
    }
  }

  private mergeSettings(
    winners: SettingMap | undefined,
    losers: SettingMap | undefined,
  ): SettingMap {
    try {
      if (winners === undefined && losers === undefined)
        return {};
      else if (losers === undefined)
        return winners!;
      else if (winners === undefined)
        return losers;
      else {
        const sharedKeys: string[] = intersectKeys(
          winners,
          losers,
        );
        const uniqueKeysW: string[] = uniqueKeysOf(
          winners,
          sharedKeys,
        );
        const uniqueKeysL: string[] = uniqueKeysOf(
          losers,
          sharedKeys,
        );
        const mergedMap: Map<string, SettingValue> = new Map();
        const losingMap: Map<string, SettingValue> = new Map(
          Object.entries(losers),
        );
        const winningMap: Map<string, SettingValue> = new Map(
          Object.entries(winners),
        );

        for (const loser of uniqueKeysL)
          mergedMap.set(loser, losingMap.get(loser)!);

        for (const winner of uniqueKeysW)
          mergedMap.set(winner, winningMap.get(winner)!);

        for (const key of sharedKeys) {
          if (
            isPrimitive(winningMap.get(key)!)
            && isPrimitive(losingMap.get(key)!)
          )
            mergedMap.set(key, winningMap.get(key)!);
          else if (
            Array.isArray(winningMap.get(key))
            && Array.isArray(losingMap.get(key))
          )
            mergedMap.set(
              key,
              mergeArrays(
                winningMap.get(key) as SettingValue[],
                losingMap.get(key) as SettingValue[],
              ),
            );
          else if (Array.isArray(winningMap.get(key)))
            mergedMap.set(
              key,
              mergeArrays(
                winningMap.get(key) as SettingValue[],
                [losingMap.get(key)!],
              ),
            );
          else if (Array.isArray(losingMap.get(key)))
            mergedMap.set(
              key,
              mergeArrays(
                [winningMap.get(key)!],
                losingMap.get(key) as SettingValue[],
              ),
            );
          else
            mergedMap.set(
              key,
              this.mergeSettings(
                winningMap.get(key) as SettingMap,
                losingMap.get(key) as SettingMap,
              ),
            );
        }

        return Object.fromEntries(mergedMap);
      }
    }
    catch (e) {
      throw new EvalError(
        `Setting: mergeSettings: \n${e as string}`,
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
          `isPrimitive: \n${e as string}`,
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
        throw new EvalError(
          `mergeArrays: \n${e as string}`,
        );
      }
    }

    function intersectKeys(a: SettingMap, b: SettingMap): string[] {
      try {
        const bKeys: string[] = Object.keys(b);

        return Object.keys(a)
          .filter(aKey =>
            bKeys
              .includes(aKey));
      }
      catch (e) {
        throw new EvalError(
          `intersectKeys: \n${e as string}`,
        );
      }
    }

    function uniqueKeysOf(x: SettingMap, sharedKeys: string[]): string[] {
      try {
        return Object.keys(x)
          .filter(xKey =>
            !sharedKeys
              .includes(xKey));
      }
      catch (e) {
        throw new EvalError(
          `uniqueKeysOf: \n${e as string}`,
        );
      }
    }
  }

  private _cachedSetting?: C;
}

module.exports = Setting;

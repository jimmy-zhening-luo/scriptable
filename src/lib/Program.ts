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

class _Config {
  protected file: typeof _Config.ReadOnlyFile;
  constructor (
    configSubdirectoryPath: string,
    programName: string
  ) {
    this.file = new _Config.ReadOnlyFile(
      _Config.System.configRuntimeDir as string,
      _Config.ReadOnlyFile.joinPaths(
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
    return _Config.System.ReadOnlyFile;
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
      : { }
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
    return _Config.mergeSettings(
      this.user,
      this.app
    );
  }

  get mergedUserOverridesProhibited(): SettingValue {
    return _Config.mergeSettings(
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
            _Config.mergeSettings(
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

class _Storage {
  readonly file: typeof _Storage.File;
  constructor(
    storageSubdirectoryPath: string,
    programName: string,
    subpath?: string | undefined
  ) {
    this.file = new _Storage.File(
      _Storage.System.storageRuntimeDir,
      _Storage.File.joinPaths(
        _Storage.File.joinPaths(
          storageSubdirectoryPath,
          programName
        ),
        subpath ?? String("default.txt")
      )
    );
  }

  private static get System() {
    return importModule("./system/System");
  }
  
  private static get File() {
    return _Storage.System.File;
  }

  get path(): string {
    return this.file.path as string;
  }

  get data(): string {
    return this.file.data as string;
  }

  read(): string {
    return this.data;
  }

  write(
    text: string
  ): void {
    const overwrite: boolean = true;
    this.file.write(
      text,
      overwrite
    );
  }

  toString(): string {
    return this.data;
  }
}


abstract class _Program {
  abstract get input(): any;
  abstract runtime(input: any): any;
  abstract handleOutput(output: any): any;
  
  run(): any {
    return this.handleOutput(
      this.runtime(
        this.input
      )
    );
  }
  
  protected get configSubdirectoryPath(): string {
    return String("Program");
  }

  protected get storageSubdirectoryPath(): string {
    return this.configSubdirectoryPath;
  }
  
  get config(): _Config {
    return new _Config(
      this.configSubdirectoryPath,
      this.constructor.name
    );
  }
  
  protected storage(
    subpath?: string | undefined
  ): _Storage {
    return new _Storage(
      this.storageSubdirectoryPath,
      this.constructor.name,
      subpath
    );
  }

  readStorage(
    subpath?: string | undefined
  ): string {
    return this
      .storage(subpath)
      .read();
  }

  writeStorage(
    text: string,
    subpath?: string | undefined
  ): void {
    this
      .storage(subpath)
      .write(text);
  }
}

abstract class _Shortcut extends _Program {
  get input(): any {
    return args;
  }
  
  handleOutput(
    output: any
  ): any {
    Script.setShortcutOutput(output);
    return output;
  }
  
  protected override get configSubdirectoryPath(): string {
    return [
      super.configSubdirectoryPath,
      "Shortcut"
    ].join("/");
  }
}

module.exports = _Program;
module.exports.Program = _Program;
module.exports.Shortcut = _Shortcut;
module.exports.Config = _Config;
module.exports.Storage = _Storage;

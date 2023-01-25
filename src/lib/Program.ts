class _Config {
  protected file: typeof _Config.ReadOnlyFile;
  constructor (
    configSubdirectory: string,
    programName: string
  ) {
    this.file = new _Config.ReadOnlyFile(
      _Config.System.configRuntimeDir,
      _Config.ReadOnlyFile.joinPaths(
        configSubdirectory,
        [programName, "json"]
          .join(".")
      )
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
    return isParseable?
      JSON.parse(this.file.data) as ConfigObject
      :{ "app": { }, "user": { } } as ConfigObject;
      
  }

  get unmerged(): ConfigObject {
    return this.parsed;
  }

  get app(): SettingValue {
    return this.unmerged.app;
  }

  get user(): SettingValue {
    return this.unmerged.user;
  }

  get merged(): SettingValue {
    return _Config.mergeSections(
      this.unmerged.userSection,
      this.unmerged.appSection
    );
  }

  get mergedUserOverridesProhibited(): SettingValue {
    return _Config.mergeSections(
      this.unmerged.appSection,
      this.unmerged.userSection
    );
  }

  toString(): string {
    return this.file.data as string;
  }

  static mergeSections(
    winners: SettingsConfigSection,
    losers: SettingsConfigSection
  ): SettingValue {

    function mergePrimitives(
      winner: nullablePrimitive,
      loser: nullablePrimitive
    ): primitive {
      return (winner ?? loser) ?? String();
    };

    function mergeArrays(
      winner: Array<any>,
      loser: Array<any>
    ): Array<any> {
      return winner.concat(loser);
    };

    function isPrimitive(
      obj: SettingValue
    ): boolean {
      return (
        obj?.constructor === String
        || obj?.constructor === Number
        || obj?.constructor === Boolean
      );
    };

    function intersectKeys(
      a: SettingsConfigSection,
      b: SettingsConfigSection
    ): Array<string> {
      return Object.keys(a)
        .filter(
          (aKey: any) => (
            aKey?.constructor === String
          )
        )
        .filter(
          (aKey: string) => (
            Object.keys(b).includes(aKey)
          )
        );
    };

    function uniqueKeysOf(
      obj: Object,
      intersection: Array<string>
    ): Array<string> {
      return Object.keys(obj)
        .filter(
          (objKey: any) => (
            objKey?.constructor === String
          )
        )
        .filter(
          (objKey: string) => (
            !intersection.includes(objKey)
          )
      );
    };

    const intersection = intersectKeys(
      winners,
      losers
    );

    const uniqueWinners = uniqueKeysOf(
      winners,
      intersection
    );
    const uniqueLosers = uniqueKeysOf(
      losers,
      intersection
    );

    const merger = new Map<string, string|number|boolean|Object|Array<any> >();
    for (const loser of uniqueLosers)
      merger.set(loser, losers[loser]);
    for (const winner of uniqueWinners)
      merger.set(winner, winners[winner]);
    for (const i: string of intersection) {
      if (winners[i] === undefined
        || winners[i] === null
      ) merger.set(i, losers[i]);
      else if (losers[i] === undefined
        || losers[i] === null
      ) merger.set(i, winners[i]);
      else if (primitive(winners[i])
        && primitive(losers[i])
      ) merger.set(i, mergePrimitives(
          winners[i],
          losers[i]
        )
      );
      else if (Array.isArray(winners[i])
        && Array.isArray(losers[i])
      ) merger.set(i, mergeArrays(
          winners[i],
          losers[i]
        )
      );
      else if (Array.isArray(winners[i]))
        merger.set(i, mergeArrays(
          winners[i],
          [losers[i]]
        )
      );
      else if (Array.isArray(losers[i]))
        merger.set(i, mergeArrays(
          [winners[i]],
          losers[i]
        )
      );
      else
        merger.set(i, this.mergeSections(
          winners[i],
          losers[i]
        )
      );
    }
    return (
      Object.fromEntries(merger)
    );
  }
}

namespace _Config {
  export type ConfigObject = (
    AppSection
    & UserSection
  ); 
  
  export interface AppSection {
    "app"?: Setting
  }
  
  export interface UserSection {
    "user"?: Setting
  }
  
  export interface Setting {
    [key: string]: SettingValue
  };
  
  export type SettingValue = (
    primitive
    | ArrayOfSettingValues
    | Setting
  );
  
  export type primitive = (
   string
   | number
   | boolean
  );
  
  export type ArrayOfSettingValues = (
    Array<primitive>
    | Array<Setting>
  ); 
}


class _Storage {
  readonly file: typeof _Storage.System.File;
  private static get System() {
    return importModule("./system/System");
  }
  constructor(
    storageSubdirectory: string,
    programName: string,
    subpath?: string | undefined
  ) {
    this.file = new _Storage.System.File(
      _Storage.System.storageRuntimeDir,
      _Storage.System.File.joinPaths(
        _Storage.System.File.joinPaths(
          storageSubdirectory,
          programName
        ),
        subpath ?? String("default.txt")
      )
    );
  }

  get path(): string {
    return this.file.path;
  }

  get data(): string {
    return this.file.data;
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

  toString() {
    return this.data;
  }
}

class _Program {
  readonly config: _Config = new _Config(
    _Program.configSubdirectory,
    String()
  );
  readonly storage: _Storage = new _Storage(
    _Program.storageSubdirectory,
    String()
  );
  inputs: any;
  runtime: Function;
  outputHandler;

  constructor() {
    throw new TypeError("class Program::" + this.constructor.name + ":constructor(): Program is an abstract class that is meant to be inherited, not instantiated.");
  }

  static run() {
    throw new TypeError("class Program::" + this.constructor.name + ":run(): Program:run() is an abstract function. It should be implemented by the inheriting class.");
  }

  static get configSubdirectory(): string{
    return String("Program");
  }

  static get storageSubdirectory(): string {
    return this.configSubdirectory;
  }

  static loadData(
    subpath = String()
  ) {
    return new Data(
      this.dataRoot ?? String(),
      this.name ?? String(),
      (subpath?.constructor === String) ?
        subpath
        : String()
    );
  }

  static saveData(
    subpath = String(),
    data = String()
  ) {
    this.loadData(subpath)?.write(
      (data?.constructor === String) ?
        data
        : String()
    );
  }

}

class _Shortcut extends _Program {
  static get configSubdirectory() {
    return [
      (
        (super.configSubdirectory
          ?.constructor === String
        ) ?
          super.configSubdirectory
          : String()
      ) ?? String(),
      String("Shortcut")
    ].join("/")
      ?? String();
  }
}

class _Script extends _Program {
  static get configSubdirectory() {
    return [
      (
        (super.configSubdirectory
          ?.constructor === String
        ) ?
          super.configSubdirectory
          : String()
      ) ?? String(),
      String("Script")
    ].join("/")
      ?? String();
  }
}

module.exports = _Program;
module.exports.Program = _Program;
module.exports.Shortcut = _Shortcut;
module.exports.Script = _Script;
module.exports.Config = _Config;
module.exports.Storage = _Storage;

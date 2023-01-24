type primitive = string | number | boolean;
type nullablePrimitive = primitive | unknown;

class Setting {
  readonly key: string;
  readonly value: (
    nullablePrimitive
    | Array<any>
    | Object
  );

  constructor(
    key: string,
    value: nullablePrimitive | Array<any> | Object
  ) {
    this.key = key;
    this.value = value;
  }
}

class SettingsConfigSection {
  readonly bag: Setting;
  constructor(
    sectionKey: string,
    sectionValue?: Object | undefined
  ) {
    this.bag = new Setting(sectionKey, sectionValue);
  }
}

class SettingsConfigAppSection extends SettingsConfigSection {
  constructor(
    sectionValue?: Object | undefined
  ) {
    super("app", sectionValue);
  }
}

class SettingsConfigUserSection extends SettingsConfigSection {
  constructor(
    sectionValue?: Object | undefined
  ) {
    super("user", sectionValue);
  }
}

type SettingsConfigInterface = {
  app?: Object | undefined,
  user?: Object | undefined
}

class SettingsConfig {
  readonly app: SettingsConfigAppSection;
  readonly user: SettingsConfigUserSection;
  constructor(settings?: SettingsConfigInterface | undefined) {
    if (settings === undefined) {
      this.app = new SettingsConfigAppSection();
      this.user = new SettingsConfigUserSection();
    }
    else {
      this.app = new SettingsConfigAppSection(settings.app);
      this.user = new SettingsConfigUserSection(settings.user);
    }
  }

  get inner() {

  }
}

class _Config {
  protected file: (
    typeof _Config.System.ReadOnlyFile
  );
  constructor (
    configRoot: string,
    programName: string
  ) {
    this.file = new _Config.System.ReadOnlyFile(
      _Config.System.configRuntime,
      _Config.System.ReadOnlyFile.joinPaths(
        configRoot,
        [programName, "json"].join(".")
      )
    );
  }

  private static get System() {
    return importModule("./system/System");
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

  get unmerged(): SettingsConfig {
    return this.isParseable ?
      new SettingsConfig(
        JSON.parse(this.file.data) as SettingsConfigInterface
      )
      : new SettingsConfig();
  }

  get app(): Object {
    return this.unmerged.app;
  }

  get user(): Object {
    return this.unmerged.user;
  }

  get merged(): Object {
    return _Config.mergeSections(
      this.user,
      this.app,
    );
  }

  get mergedUserOverridesProhibited(): Object {
    return _Config.mergeSections(
      this.app,
      this.user,
    );
  }

  toString(): string {
    return this.file.data as string;
  }

  static mergeSections(
    winners: Object,
    losers: Object
  ): Object {
    function mergePrimitives(
      winner: string | boolean | number | undefined,
      loser: string | boolean | number | undefined
    ): string | boolean | number {
      return (winner ?? loser) ?? String();
    };

    function mergeArrays(
      winner: Array<any>,
      loser: Array<any>
    ): Array<any> {
      return winner.concat(loser);
    };

    function primitive(
      obj: any | undefined | null
    ): boolean {
      return (
        obj?.constructor === String
        || obj?.constructor === Number
        || obj?.constructor === Boolean
      );
    };

    function intersectKeys(
      a: Object,
      b: Object
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

class _Storage {
  readonly file: typeof _Storage.System.File;
  private static get System() {
    return importModule("./system/System");
  }
  constructor(
    storageRoot: string,
    programName: string,
    subpath?: string | undefined
  ) {
    this.file = new _Storage.System.File(
      _Storage.System.dataRuntime,
      _Storage.System.File.joinPaths(
        _Storage.System.File.joinPaths(
          storageRoot,
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
    _Program.configRoot,
    String()
  );
  readonly storage: _Storage = new _Storage(
    _Program.storageRoot,
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

  static get configRoot(): string{
    return String("Program");
  }

  static get storageRoot(): string {
    return this.configRoot;
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
  static get configRoot() {
    return [
      (
        (super.configRoot
          ?.constructor === String
        ) ?
          super.configRoot
          : String()
      ) ?? String(),
      String("Shortcut")
    ].join("/")
      ?? String();
  }
}

class _Script extends _Program {
  static get configRoot() {
    return [
      (
        (super.configRoot
          ?.constructor === String
        ) ?
          super.configRoot
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

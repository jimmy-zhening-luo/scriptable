
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
    throw new TypeError("class Program:constructor(): Program is an abstract class that is meant to be inherited, not instantiated.");
  }

  static run() {
    throw new TypeError("class Program:run(): Program:run() is an abstract function. It should be implemented by the inheriting class.");
  }

  static get configSubdirectory(): string {
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

const Config = importModule("Config");
const Data = importModule("Data");

class Program {
  constructor() {
    throw new TypeError("class Program::" + this.constructor.name + ":constructor(): Program is an abstract class that is meant to be inherited, not instantiated.");
  }
  
  static run() {
    throw new TypeError("class Program::" + this.constructor.name + ":run(): Program:run() is an abstract function. It should be implemented by the inheriting class.");
  }
  
  static get config() {
    return new Config(
      this.configRoot ?? String(),
      this.name ?? String()
    ) ?? new Config();
  }
  
  static get configRoot() {
    return String("Program");
  }
  
  static get dataRoot() {
    return this.configRoot();
  }
  
  static getData(
    subpath = String()
  ) {
    return new Data(
      this.dataRoot ?? String(),
      this.name ?? String(),
      (subpath?.constructor === String)?
        subpath
        :String()
      ) ?? new Data();
  }
}

module.exports = Program;

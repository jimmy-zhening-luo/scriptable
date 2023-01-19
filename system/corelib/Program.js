const Config = importModule("Config");

class Program {
  constructor() {
    throw new TypeError("class Program::" + this.constructor.name + ":constructor(): Program is an abstract class that is meant to be inherited, not instantiated.");
  }
  
  static get config() {
    console.log(this.configRoot);
    return new Config(
      this.configRoot,
      this.name
    ) ?? new Config();
  }
  
  static get configRoot() {
    return String("Program");
  }
}

class Shortcut extends Program {
  static get configRoot() {
    return [
      (
        (super.configRoot
          ?.constructor === String
        )?
          super.configRoot
          :String()
      ) ?? String(),
      String("Shortcut")
    ].join("/")
    ?? String();
  }
}

module.exports = Program;
module.exports.Config = Config;
module.exports.Program = Program;
module.exports.Shortcut = Shortcut;

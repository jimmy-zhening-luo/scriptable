const Program = importModule("./system/Program");

class Script extends Program {
  static get configRoot() {
    return [
      (
        (super.configRoot
          ?.constructor === String
        )?
          super.configRoot
          :String()
      ) ?? String(),
      String("Script")
    ].join("/")
    ?? String();
  }
}

module.exports = Script;

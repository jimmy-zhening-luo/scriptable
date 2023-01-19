const System = importModule("./system/System");
const ReadOnlyFile = System.ReadOnlyFile;

class Secret {
  #file = new ReadOnlyFile();
  constructor (secretSubpath = String()) {
    this.#file = ReadOnlyFile.fromFile(
      System.externalSecretsDir,
      (
        secretSubpath
        ?.constructor === String
      )?
      secretSubpath
      :String()
    ) ?? new ReadOnlyFile();
  }
  
  get secret() {
    return this.#file?.data ?? String();
  }
  
  get key() {
    return this.secret ?? String();
  }
}

module.exports = Secret;
module.exports.Secret = Secret;

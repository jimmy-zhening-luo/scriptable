const System = importModule("System");
const File = System.File;

class Data {
  #file = new File();
  constructor (
    dataRoot = String(),
    programName = String(),
    dataSubpath = String()
  ) {
    const dataDir = System.dataDir;
    this.#file = File.fromFile(
      dataDir,
      File.joinPaths(
        File.joinPaths(
          (
            dataRoot
            ?.constructor === String
          )?
          dataRoot
          :String(),
          (
            programName
            ?.constructor === String
          )?
          [
            programName ?? String(),
            String("txt")
          ].join(".")
          :String()
        ) ?? String(),
        (
          dataSubpath
          ?.constructor === String
        )?
        dataSubpath
        :String()
      )
    ) ?? new File();
  }
  
  get data() {
    return this.#file?.data ?? String();
  }
  
  load() {
    return this.data ?? String();
  }
  
  save(
    text = String()
  ) {
    const overwrite = true;
    this.#file?.write(
      (text?.constructor === String)?
      text
      :String(),
      overwrite
    );
  }
}

module.exports = Data;

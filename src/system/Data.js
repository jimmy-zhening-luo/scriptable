"use strict";
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
          programName
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
  
  get path() {
    return this.#file?.path ?? String();
  }
  
  get data() {
    return this.#file?.data ?? String();
  }
  
  read() {
    return this.data ?? String();
  }
  
  write(
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
  
  toString() {
    return this.data ?? String();
  }
}

module.exports = Data;

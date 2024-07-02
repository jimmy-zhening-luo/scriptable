import type IFile from "./file/IFile.js";

const iFile = importModule(
  `file/IFile`,
) as typeof IFile;

export default class WriteFile extends iFile {}
module.exports = WriteFile;

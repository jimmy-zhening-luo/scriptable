const w_IFile: typeof IFile = importModule(
  "file/IFile",
) as typeof IFile;

class WriteFile extends w_IFile {}

module.exports = WriteFile;

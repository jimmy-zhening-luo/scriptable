const f_IFile: typeof IFile = importModule("file/IFile") as typeof IFile;

class Folder extends f_IFile {}

module.exports = Folder;

const _File = importModule("file/File");
class ReadOnlyFile extends _File {
    delete() {
        throw new ReferenceError("File::ReadOnlyFile:delete(): Cannot delete a read-only file or folder.");
    }
    write() {
        throw new ReferenceError("File::ReadOnlyFile:write(): Cannot write to or overwrite a read-only file.");
    }
}
module.exports = ReadOnlyFile;
//# sourceMappingURL=ReadOnlyFile.js.map
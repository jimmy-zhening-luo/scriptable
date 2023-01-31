class ReadOnlyFile extends File {
    delete() {
        throw new ReferenceError("File::ReadOnlyFile:delete(): Cannot delete a read-only file or folder.");
    }
    write() {
        throw new ReferenceError("File::ReadOnlyFile:write(): Cannot write to or overwrite a read-only file.");
    }
}
//# sourceMappingURL=ReadOnlyFile.js.map
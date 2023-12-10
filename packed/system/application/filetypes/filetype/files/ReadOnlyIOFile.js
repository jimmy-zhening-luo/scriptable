"use strict";
const _IOFile = importModule("file/IOFile");
class ReadOnlyIOFile extends _IOFile {
    static get IOFile() {
        try {
            return _IOFile;
        }
        catch (e) {
            throw new ReferenceError(`IOFile::ReadOnlyIOFile: IOFile: Failed to import module IOFile: \n${e}`);
        }
    }
    delete() {
        throw new ReferenceError(`IOFile::ReadOnlyIOFile:delete(): Cannot delete a read-only file or folder.`);
    }
    write() {
        throw new ReferenceError(`IOFile::ReadOnlyIOFile:write(): Cannot write to or overwrite a read-only file.`);
    }
}
module.exports = ReadOnlyIOFile;

"use strict";
class Files {
    static get ReadOnlyIOFile() {
        try {
            return importModule("ReadOnlyIOFile");
        }
        catch (e) {
            throw new ReferenceError(`Files: Error importing ReadOnlyIOFile class: \n${e}`);
        }
    }
    static get IOFile() {
        try {
            return Files.ReadOnlyIOFile.IOFile;
        }
        catch (e) {
            throw new ReferenceError(`Files: Error importing IOFile class: \n${e}`);
        }
    }
    static get Bookmark() {
        try {
            return Files.IOFile.Bookmark;
        }
        catch (e) {
            throw new ReferenceError(`Files: Error importing Bookmark class: \n${e}`);
        }
    }
    static get FilepathString() {
        try {
            return Files.IOFile.FilepathString;
        }
        catch (e) {
            throw new ReferenceError(`Files: Error importing FilepathString class: \n${e}`);
        }
    }
}
module.exports = Files;

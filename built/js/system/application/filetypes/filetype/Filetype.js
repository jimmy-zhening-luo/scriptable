"use strict";
class Filetype {
    constructor(utilityClassName, utilityFileSubpath, FileTypeConstructor = Filetype.ReadOnlyIOFile) {
        try {
            this._file = new FileTypeConstructor(this._utilityClassNameToBookmark(utilityClassName), utilityFileSubpath);
        }
        catch (e) {
            throw new EvalError(`Utility: constructor: Caught unhandled exception while creating Utility file: \n${e}`);
        }
    }
    static get Files() {
        try {
            return importModule("files/Files");
        }
        catch (e) {
            throw new ReferenceError(`Utility: Files: Error importing Files module: \n${e}`);
        }
    }
    static get ReadOnlyIOFile() {
        try {
            return Filetype.Files.ReadOnlyIOFile;
        }
        catch (e) {
            throw new ReferenceError(`Utility: ReadOnlyIOFile: Error importing ReadOnlyIOFile class: \n${e}`);
        }
    }
    static get IOFile() {
        try {
            return Filetype.Files.IOFile;
        }
        catch (e) {
            throw new ReferenceError(`Utility: IOFile: Error importing IOFile class: \n${e}`);
        }
    }
    get isFile() {
        try {
            return this._file.isFile;
        }
        catch (e) {
            throw new EvalError(`Utility: isFile: Error checking if file exists and is a file, not a directory: \n${e}`);
        }
    }
    get path() {
        try {
            return this._file.path;
        }
        catch (e) {
            throw new EvalError(`Utility: path: Error getting path: \n${e}`);
        }
    }
    get subpath() {
        try {
            return this._file.subpath;
        }
        catch (e) {
            throw new EvalError(`Utility: subpath: Error getting subpath: \n${e}`);
        }
    }
    get filename() {
        try {
            return this._file.isFile
                ? this._file.leaf
                : "";
        }
        catch (e) {
            throw new EvalError(`Utility: filename: Error getting filename: \n${e}`);
        }
    }
    read() {
        try {
            return this._file.isFile
                ? this._file.read()
                : "";
        }
        catch (e) {
            throw new ReferenceError(`Utility: read: Error reading file: \n${e}`);
        }
    }
    toString() {
        try {
            return this.read();
        }
        catch (e) {
            throw new EvalError(`Utility: toString: Error getting data: \n${e}`);
        }
    }
    _utilityClassNameToBookmark(utilityClassName) {
        try {
            if (utilityClassName === "")
                throw new SyntaxError(`Utility name passed to Utility abstract base class constructor was empty. Utility name must be a non-empty string.`);
            else {
                const utilityRootBookmarkName = [
                    "#",
                    utilityClassName,
                ].join("");
                const utilityRootBookmark = new Filetype.IOFile.Bookmark(utilityRootBookmarkName);
                if (!utilityRootBookmark.resolves)
                    throw new ReferenceError(`Utility root bookmark name '${utilityRootBookmarkName}' does not resolve to a Scriptable bookmark`);
                else
                    return utilityRootBookmark;
            }
        }
        catch (e) {
            throw new EvalError(`Error while getting Utility root bookmark for the Utility class named '${utilityClassName}': \n${e}`);
        }
    }
}
module.exports = Filetype;

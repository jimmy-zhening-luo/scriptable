"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class IOFile {
    constructor(base = "", ...subpaths) {
        this._nominalType = "IOFile";
        try {
            this._root
                = base instanceof IOFile
                    ? base._path
                    : new IOFile.FilepathString(base instanceof IOFile.Bookmark
                        ? base.path
                        : base);
            this._subpath = new IOFile.FilepathString(...subpaths);
        }
        catch (e) {
            throw new SyntaxError(`IOFile: constructor: Error constructing IOFile: \n${e}`);
        }
    }
    static get Bookmark() {
        try {
            return importModule("bookmark/Bookmark");
        }
        catch (e) {
            throw new ReferenceError(`IOFile: Error importing Bookmark class: \n${e}`);
        }
    }
    static get FilepathString() {
        try {
            return importModule("filepathstring/FilepathString");
        }
        catch (e) {
            throw new ReferenceError(`IOFile: Error importing FilepathString class: \n${e}`);
        }
    }
    get subpath() {
        try {
            return this._subpath.toString();
        }
        catch (e) {
            throw new EvalError(`IOFile: subpath: Error getting subpath: \n${e}`);
        }
    }
    get path() {
        try {
            return this._path.toString();
        }
        catch (e) {
            throw new EvalError(`IOFile: path: Error getting path: \n${e}`);
        }
    }
    get leaf() {
        try {
            return this._path.leaf;
        }
        catch (e) {
            throw new EvalError(`IOFile: leaf: Error getting leaf: \n${e}`);
        }
    }
    get root() {
        try {
            return new this.constructor(this._root);
        }
        catch (e) {
            throw new EvalError(`IOFile: root: Error getting root: \n${e}`);
        }
    }
    get parent() {
        try {
            return new this.constructor(this.root, this._subpath.parent);
        }
        catch (e) {
            throw new ReferenceError(`IOFile: parent: Error getting parent IOFile object: \n${e}`);
        }
    }
    get exists() {
        try {
            return this.isFile || this.isDirectory;
        }
        catch (e) {
            throw new ReferenceError(`IOFile: exists: Error checking whether file exists: \n${e}`);
        }
    }
    get isFile() {
        try {
            return FileManager.iCloud()
                .fileExists(this.path) && !this.isDirectory;
        }
        catch (e) {
            throw new ReferenceError(`IOFile: isFile: Error using Scriptable FileManager class to check whether path is file: \n${e}`);
        }
    }
    get isDirectory() {
        try {
            return FileManager.iCloud()
                .isDirectory(this.path);
        }
        catch (e) {
            throw new ReferenceError(`IOFile: isDirectory: Error using Scriptable FileManager class to check whether path is directory: \n${e}`);
        }
    }
    get isRoot() {
        try {
            return this._subpath.isEmpty;
        }
        catch (e) {
            throw new EvalError(`IOFile: isRoot: Error checking whether file is root (empty subpath): \n${e}`);
        }
    }
    get isLeaf() {
        try {
            return (!this.exists
                || this.isFile
                || this.isDirectory && this.ls.length === 0);
        }
        catch (e) {
            throw new ReferenceError(`IOFile: isLeaf: Error checking whether file is leaf: \n${e}`);
        }
    }
    get ls() {
        try {
            return this.isDirectory
                ? FileManager.iCloud()
                    .listContents(this.path)
                : [];
        }
        catch (e) {
            throw new ReferenceError(`IOFile: ls: Error using Scriptable FileManager class to list contents of directory: \n${e}`);
        }
    }
    get descendants() {
        try {
            return this.isFile
                ? [this]
                : this.isLeaf
                    ? []
                    : this.ls
                        .map(leaf => this.append(leaf))
                        .filter(child => !this.path.startsWith(child.path))
                        .map(file => file.descendants)
                        .flat(1);
        }
        catch (e) {
            throw new ReferenceError(`IOFile: Error getting descendants: \n${e}`);
        }
    }
    get _path() {
        try {
            return this._root.append(this._subpath);
        }
        catch (e) {
            throw new EvalError(`IOFile: _path: Error getting path: \n${e}`);
        }
    }
    set subpath(subpath) {
        try {
            this._subpath = new IOFile.FilepathString(subpath);
        }
        catch (e) {
            throw new SyntaxError(`IOFile: subpath: Error setting subpath: \n${e}`);
        }
    }
    static [Symbol.hasInstance](instance) {
        try {
            return (instance !== null
                && instance !== undefined
                && typeof instance === "object"
                && "_nominalType" in instance
                && instance._nominalType === "IOFile");
        }
        catch (e) {
            throw new Error(`IOFile: Error checking if object is IOFile: \n${e}`);
        }
    }
    static join(...filepaths) {
        try {
            return IOFile.FilepathString.join(...filepaths);
        }
        catch (e) {
            throw new SyntaxError(`IOFile: static join: Error joining paths: \n${e}`);
        }
    }
    append(...filepaths) {
        try {
            return new this.constructor(this.root, this._subpath.append(...filepaths));
        }
        catch (e) {
            throw new EvalError(`IOFile: append: Error appending subpath: \n${e}`);
        }
    }
    cd(...relativeFilepath) {
        try {
            this._subpath.cd(...relativeFilepath);
            return this;
        }
        catch (e) {
            throw new EvalError(`IOFile: cd: Error changing directory: \n${e}`);
        }
    }
    read() {
        try {
            if (!this.isFile)
                throw new ReferenceError(`IOFile does not exist.`);
            return FileManager.iCloud()
                .readString(this.path);
        }
        catch (e) {
            throw new EvalError(`IOFile: read: Error reading file at "${this.path}": \n${e}`);
        }
    }
    write(data, overwrite = false) {
        try {
            if (this.isDirectory)
                throw new ReferenceError(`Path points to folder. Cannot write to a folder.`);
            else if (this.isFile && !overwrite)
                throw new ReferenceError(`To overwrite an existing file, IOFile.write must be called with flag 'overwrite' === true.`);
            else {
                if (!this.parent.isDirectory)
                    try {
                        FileManager.iCloud()
                            .createDirectory(this.parent.path, true);
                    }
                    catch (e) {
                        throw new EvalError(`Could not create parent directory using Scriptable FileManager class. See caught error: \n${e}`);
                    }
                try {
                    FileManager.iCloud()
                        .writeString(this.path, data);
                }
                catch (e) {
                    throw new EvalError(`Could not write data to file using Scriptable FileManager class. See caught error: \n${e}`);
                }
                return this;
            }
        }
        catch (e) {
            throw new EvalError(`IOFile: write: Error writing data to file "${this.path}": \n${e}`);
        }
    }
    delete(force = false) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.exists) {
                    if (force)
                        __deleteUsingFileManager(this.path);
                    else {
                        const confirm = new Alert();
                        confirm.message = `Are you sure you want to delete this file or folder (including all descendants)? Path: ${this.path}`;
                        confirm.addDestructiveAction("Yes, DELETE this file");
                        confirm.addCancelAction("Cancel");
                        yield confirm.present()
                            .then(userChoice => {
                            userChoice === 0
                                ? __deleteUsingFileManager(this.path)
                                : console.warn(`User canceled file deletion of file or folder at path: ${this.path}`);
                        });
                    }
                }
                function __deleteUsingFileManager(path) {
                    try {
                        FileManager.iCloud()
                            .remove(path);
                        if (FileManager.iCloud()
                            .fileExists(path))
                            throw new ReferenceError(`IOFile still exists after using Scriptable FileManager class to delete it.`);
                    }
                    catch (e) {
                        if (!(e instanceof ReferenceError))
                            e = new EvalError(`Could not delete file using Scriptable FileManager class. See caught error: \n${e}`);
                        throw new EvalError(`__deleteUsingFileManager: \n${e}`);
                    }
                }
                return this;
            }
            catch (e) {
                throw new EvalError(`IOFile: delete: Error deleting file at path "${this.path}": \n${e}`);
            }
        });
    }
    toString() {
        try {
            return this.path;
        }
        catch (e) {
            throw new EvalError(`IOFile: toString: Error getting path: \n${e}`);
        }
    }
    toTree() {
        try {
            return this._path.toTree();
        }
        catch (e) {
            throw new EvalError(`IOFile: toTree: Error getting tree: \n${e}`);
        }
    }
}
module.exports = IOFile;

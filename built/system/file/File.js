"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _File_subpath;
class File {
    constructor(subpath = String()) {
        _File_subpath.set(this, String());
        this.subpath = (subpath !== null && subpath !== undefined && subpath.constructor === String) ?
            subpath
            : String();
    }
    static fromFile(file, relativePath = String()) {
        return new File(File.walkPath(file.subpath, relativePath));
    }
    get bookmarkedPath() {
        return String();
    }
    get data() {
        if (this.isReadable)
            return FileManager.iCloud().readString(this.path);
        else
            return String();
    }
    get descendants() {
        if (this.isFile)
            return [this];
        else if (this.isBottom)
            return (new Array());
        else if (this.isDirectory) {
            return this.ls.map((leaf) => (File.joinPaths(this.subpath, File.trimPath(leaf)))).map((subpath) => (new File(subpath))).filter((file) => (!this.path.startsWith(file.path))).map((file) => (file.descendants)).flat(1);
        }
        else
            return (new Array());
    }
    get exists() {
        return (this.parentExists
            && FileManager.iCloud().fileExists(this.path));
    }
    get isBottom() {
        return (this.isFile
            || (Array.isArray(this.ls)
                && this.ls.length === 0));
    }
    get isDirectory() {
        return FileManager.iCloud().isDirectory(this.path);
    }
    get isEnumerable() {
        return this.isDirectory;
    }
    get isFile() {
        return (this.exists
            && !this.isDirectory);
    }
    get isReadable() {
        return this.isFile;
    }
    get isTop() {
        return (this.subpath === this.parentSubpath);
    }
    get leaf() {
        return File.trimPath(this.path.split("/").slice(-1).shift());
    }
    get ls() {
        return this.isDirectory ?
            FileManager.iCloud().listContents(this.path)
            : new Array();
    }
    get parent() {
        return new File(this.parentSubpath);
    }
    get parentExists() {
        return this.parent.isDirectory;
    }
    get parentIsSelf() {
        return this.isTop;
    }
    get parentPath() {
        return this.parent.path;
    }
    get parentSubpath() {
        return File.trimPath(this.subpath.split("/").slice(0, -1).join("/"));
    }
    get path() {
        return File.joinPaths(this.bookmarkedPath, this.subpath);
    }
    get pathTree() {
        return File.pathToTree(this.path);
    }
    get root() {
        return this.bookmarkedPath;
    }
    get subpath() {
        return __classPrivateFieldGet(this, _File_subpath, "f");
    }
    set subpath(path) {
        __classPrivateFieldSet(this, _File_subpath, File.trimPath(path), "f");
    }
    get subpathTree() {
        return File.pathToTree(this.subpath);
    }
    cd(relativePath = String()) {
        this.subpath = File.trimPath(this.subpathRelativeTo(File.trimPath(relativePath)));
    }
    delete(force = false) {
        if (this.exists) {
            if (force)
                FileManager.iCloud().remove(this.path);
            else {
                const confirm = new Alert();
                confirm.message = String("Are you sure you want to delete this file or folder (including all descendants)? Path: "
                    + this.path);
                confirm.addDestructiveAction("Yes, DELETE this file");
                confirm.addCancelAction("Cancel");
                confirm.present().then((userChoice) => ((userChoice === 0) ?
                    FileManager.iCloud().remove(this.path)
                    : console.log("User canceled file deletion.")));
            }
        }
    }
    pathRelativeTo(relativePath = String()) {
        return File.trimPath(File.walkPath(this.path, File.trimPath(relativePath)));
    }
    read() {
        return this.data;
    }
    subpathRelativeTo(relativePath = String()) {
        return File.trimPath(File.walkPath(this.subpath, File.trimPath(relativePath)));
    }
    toString() {
        return this.path;
    }
    write(data, overwrite = false) {
        if (this.isDirectory)
            throw new ReferenceError("File:write: File path points to a folder. Cannot write data to a folder.");
        else if (this.exists
            && !overwrite)
            throw new ReferenceError("File:write: File already exists. To overwrite existing data, write must be called with overwrite === true.");
        else {
            if (!this.parentExists)
                FileManager.iCloud().createDirectory(this.parentPath, true);
            FileManager.iCloud().writeString(this.path, data);
        }
    }
    static joinPaths(left = String(), right = String()) {
        left = File.trimPath(left);
        right = File.trimPath(right);
        return File.trimPath(FileManager.iCloud().joinPath(left, right));
    }
    static pathToTree(path = String()) {
        return File.trimPath(path)
            .split("/")
            .map((node) => (File.trimPath(node)))
            .filter((node) => (node.trim() !== String()));
    }
    static treeToPath(tree = new Array()) {
        return File.trimPath(tree.map((node) => (File.trimPath(node)))
            .filter((node) => (node.trim() !== String()))
            .join("/")
            .trim());
    }
    static trimPath(path = String()) {
        path = path.trim();
        while (path.startsWith("/"))
            path = path.slice(1);
        while (path.endsWith("/"))
            path = path.slice(0, -1);
        path = path.trim();
        return path;
    }
    static walkPath(path = String(), relativePath = String()) {
        const pathTree = File.pathToTree(File.trimPath(path));
        const relPathTree = File.pathToTree(File.trimPath(relativePath));
        for (const node of relPathTree) {
            if (node.trim() === ".")
                pathTree.pop();
            else if (node.trim() !== String())
                pathTree.push(node);
        }
        return File.trimPath(File.treeToPath(pathTree));
    }
}
_File_subpath = new WeakMap();
module.exports = File;

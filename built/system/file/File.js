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
var __File_subpath;
class _Bookmark {
    constructor(bookmark = String()) {
        this.path = String();
        this.bookmark = bookmark.trim();
        this.path = ((this.bookmark === String()) ?
            String()
            : FileManager
                .iCloud()
                .bookmarkedPath(bookmark));
    }
    toString() {
        return this.path;
    }
}
class _File {
    constructor(base, subpath) {
        __File_subpath.set(this, String());
        this.bookmark = new _Bookmark();
        if (base === undefined) {
            this.bookmark = new _Bookmark();
            this.subpath = String();
        }
        else if (base instanceof _Bookmark) {
            this.bookmark = base;
            if (subpath === undefined)
                this.subpath = String();
            else
                this.subpath = subpath;
        }
        else if (base instanceof _File) {
            this.bookmark = base.bookmark;
            if (subpath === undefined)
                this.subpath = base.subpath;
            else
                this.subpath = _File.walkPath(base.subpath, subpath);
        }
        else {
            this.bookmark = new _Bookmark();
            this.subpath = base;
        }
    }
    get bookmarkedPath() {
        return this.bookmark.path;
    }
    get data() {
        if (this.isReadable)
            return _File.m.readString(this.path);
        else
            return String();
    }
    get descendants() {
        if (this.isFile)
            return [this];
        else if (this.isBottom)
            return (new Array());
        else if (this.isDirectory) {
            return this.ls.map((leaf) => (_File.joinPaths(this.subpath, _File.trimPath(leaf)))).map((subpath) => (new _File(subpath))).filter((file) => (!this.path.startsWith(file.path))).map((file) => (file.descendants)).flat(1);
        }
        else
            return (new Array());
    }
    get exists() {
        return (this.parentExists
            && _File.m.fileExists(this.path));
    }
    get isBottom() {
        return (this.isFile
            || (Array.isArray(this.ls)
                && this.ls.length === 0));
    }
    get isDirectory() {
        return _File.m.isDirectory(this.path);
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
        return _File.trimPath(this.path.split("/").slice(-1).shift());
    }
    get ls() {
        return this.isDirectory ?
            _File.m.listContents(this.path)
            : new Array();
    }
    get parent() {
        return new _File(this.bookmark, this.parentSubpath);
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
        return _File.trimPath(this.subpath.split("/").slice(0, -1).join("/"));
    }
    get path() {
        return _File.joinPaths(this.bookmarkedPath, this.subpath);
    }
    get pathTree() {
        return _File.pathToTree(this.path);
    }
    get root() {
        return this.bookmarkedPath;
    }
    get subpath() {
        return __classPrivateFieldGet(this, __File_subpath, "f");
    }
    set subpath(path) {
        __classPrivateFieldSet(this, __File_subpath, _File.trimPath(path), "f");
    }
    get subpathTree() {
        return _File.pathToTree(this.subpath);
    }
    cd(relativePath = String()) {
        this.subpath = _File.trimPath(this.subpathRelativeTo(_File.trimPath(relativePath)));
    }
    delete(force = false) {
        if (this.exists) {
            if (force)
                _File.m.remove(this.path);
            else {
                const confirm = new Alert();
                confirm.message = String("Are you sure you want to delete this file or folder (including all descendants)? Path: "
                    + this.path);
                confirm.addDestructiveAction("Yes, DELETE this file");
                confirm.addCancelAction("Cancel");
                confirm.present().then((userChoice) => ((userChoice === 0) ?
                    _File.m.remove(this.path)
                    : console.log("User canceled file deletion.")));
            }
        }
    }
    pathRelativeTo(relativePath = String()) {
        return _File.trimPath(_File.walkPath(this.path, _File.trimPath(relativePath)));
    }
    read() {
        return this.data;
    }
    subpathRelativeTo(relativePath = String()) {
        return _File.trimPath(_File.walkPath(this.subpath, _File.trimPath(relativePath)));
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
                _File.m.createDirectory(this.parentPath, true);
            _File.m.writeString(this.path, data);
        }
    }
    static get m() {
        return FileManager.iCloud();
    }
    static joinPaths(left = String(), right = String()) {
        left = _File.trimPath(left);
        right = _File.trimPath(right);
        return _File.trimPath(_File.m.joinPath(left, right));
    }
    static pathToTree(path = String()) {
        return _File.trimPath(path)
            .split("/")
            .map((node) => (_File.trimPath(node)))
            .filter((node) => (node.trim() !== String()));
    }
    static treeToPath(tree = new Array()) {
        return _File.trimPath(tree.map((node) => (_File.trimPath(node)))
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
        const pathTree = _File.pathToTree(_File.trimPath(path));
        const relPathTree = _File.pathToTree(_File.trimPath(relativePath));
        for (const node of relPathTree) {
            if (node.trim() === ".")
                pathTree.pop();
            else if (node.trim() !== String())
                pathTree.push(node);
        }
        return _File.trimPath(_File.treeToPath(pathTree));
    }
}
__File_subpath = new WeakMap();
class _ReadOnlyFile extends _File {
    delete() {
        throw new ReferenceError("File::ReadOnlyFile:delete(): Cannot delete a read-only file or folder.");
    }
    write() {
        throw new ReferenceError("File::ReadOnlyFile:write(): Cannot write to or overwrite a read-only file.");
    }
}
module.exports = _File;
module.exports.File = _File;
module.exports.ReadOnlyFile = _ReadOnlyFile;
module.exports.Bookmark = _Bookmark;

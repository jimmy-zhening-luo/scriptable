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
const _Bookmark = importModule("bookmark/Bookmark");
class File {
    constructor(base = new _Bookmark(), subpath = String()) {
        _File_subpath.set(this, String());
        if (base instanceof _Bookmark) {
            this.bookmark = base;
            this.subpath = subpath;
        }
        else if (base instanceof File) {
            this.bookmark = base.bookmark;
            this.subpath = File.walkPath(base.subpath, subpath);
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
        return this.isReadable ?
            File.m.readString(this.path)
            : String();
    }
    get descendants() {
        return this.isFile ?
            [this]
            : this.isBottom ?
                []
                : !this.isDirectory ?
                    []
                    : this.ls.map((leaf) => (File.joinPaths(this.subpath, File.trimPath(leaf)))).map((subpath) => (new File(subpath))).filter((file) => (!this.path
                        .startsWith(file.path))).map((file) => (file.descendants)).flat(1);
    }
    get exists() {
        return this.parentExists
            && File.m
                .fileExists(this.path);
    }
    get isBottom() {
        return this.isFile
            || (Array.isArray(this.ls)
                && this.ls.length === 0);
    }
    get isDirectory() {
        return File.m
            .isDirectory(this.path);
    }
    get isEnumerable() {
        return this.isDirectory;
    }
    get isFile() {
        return this.exists
            && !this.isDirectory;
    }
    get isReadable() {
        return this.isFile;
    }
    get isTop() {
        return this
            .subpath === this
            .parentSubpath;
    }
    get leaf() {
        var _a;
        return File.trimPath((_a = this.path
            .split("/")
            .slice(-1)
            .shift()) !== null && _a !== void 0 ? _a : String());
    }
    get ls() {
        return this.isDirectory ?
            File
                .m.listContents(this.path)
            : [];
    }
    get parent() {
        return new File(this.bookmark, this.parentSubpath);
    }
    get parentExists() {
        return this.parent
            .isDirectory;
    }
    get parentIsSelf() {
        return this.isTop;
    }
    get parentPath() {
        return this.parent
            .path;
    }
    get parentSubpath() {
        return File.trimPath(this.subpath
            .split("/")
            .slice(0, -1)
            .join("/"));
    }
    get path() {
        return File
            .joinPaths(this.root, this.subpath);
    }
    get pathTree() {
        return File
            .pathToTree(this.path);
    }
    get root() {
        return this.bookmarkedPath;
    }
    get subpath() {
        return __classPrivateFieldGet(this, _File_subpath, "f");
    }
    set subpath(path) {
        __classPrivateFieldSet(this, _File_subpath, File
            .trimPath(path), "f");
    }
    get subpathTree() {
        return File
            .pathToTree(this.subpath);
    }
    cd(relativePath) {
        this.subpath = File.trimPath(this.subpathRelativeTo(File.trimPath(relativePath)));
    }
    delete(force = false) {
        if (this.exists) {
            if (force)
                File.m.remove(this.path);
            else {
                const confirm = new Alert();
                confirm.message = String("Are you sure you want to delete this file or folder (including all descendants)? Path: "
                    + this.path);
                confirm.addDestructiveAction("Yes, DELETE this file");
                confirm.addCancelAction("Cancel");
                confirm.present().then((userChoice) => ((userChoice === 0) ?
                    File.m.remove(this.path)
                    : console.log("User canceled file deletion.")));
            }
        }
    }
    pathRelativeTo(relativePath) {
        return File.trimPath(File.walkPath(this.path, File.trimPath(relativePath)));
    }
    read() {
        return this.data;
    }
    subpathRelativeTo(relativePath) {
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
                File.m.createDirectory(this.parentPath, true);
            File.m.writeString(this.path, data);
        }
    }
    static get m() {
        return FileManager.iCloud();
    }
    static joinPaths(left, right = String()) {
        return File.trimPath(File.m.joinPath(File.trimPath(left), File.trimPath(right)));
    }
    static pathToTree(path) {
        return File
            .trimPath(path)
            .split("/")
            .map((node) => (File.trimPath(node)))
            .filter((node) => (node.trim() !== String()));
    }
    static treeToPath(tree) {
        return File.trimPath(tree
            .map((node) => (File.trimPath(node)))
            .filter((node) => (node.trim() !== String()))
            .join("/")
            .trim());
    }
    static trimPath(path) {
        path = path.trim();
        while (path.startsWith("/"))
            path = path.slice(1);
        while (path.endsWith("/"))
            path = path.slice(0, -1);
        return path.trim();
    }
    static walkPath(path, relativePath = String()) {
        const pathTree = File
            .pathToTree(File.trimPath(path));
        const relPathTree = File
            .pathToTree(File.trimPath(relativePath));
        relPathTree.forEach((node) => {
            if (node.trim() === "..")
                pathTree.pop();
            else if (node.trim() !== String())
                pathTree.push(node);
        });
        return File.trimPath(File.treeToPath(pathTree));
    }
}
_File_subpath = new WeakMap();
//# sourceMappingURL=File.js.map
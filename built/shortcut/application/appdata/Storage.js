const STORAGE_DIR_SUBPATH_FROM_ROOT = "storage";
class Storage {
    constructor(storageSubdirectoryPath, programName, subpath = "default.txt") {
        const _File = importModule("filesystem/file/File");
        this.file = new _File(this.storageDirFile, _File.joinPaths(_File.joinPaths(storageSubdirectoryPath, programName), subpath));
    }
    get storageDirFile() {
        const _File = importModule("filesystem/file/File");
        const _Bookmark = importModule("filesystem/file/bookmark/Bookmark");
        const _Installer = importModule("./!boot/Boot");
        return new _File(new _Bookmark(_Installer.runtimeRootBookmarkName), this.storageDirSubpathFromRoot);
    }
    get storageDirSubpathFromRoot() {
        return STORAGE_DIR_SUBPATH_FROM_ROOT;
    }
    get path() {
        return this.file.path;
    }
    get data() {
        return this.file.data;
    }
    read() {
        return this.data;
    }
    write(text) {
        const overwrite = true;
        this.file.write(text, overwrite);
    }
    toString() {
        return this.data;
    }
}
module.exports = Storage;
//# sourceMappingURL=Storage.js.map
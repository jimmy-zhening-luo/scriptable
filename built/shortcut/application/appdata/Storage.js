const STORAGE_DIR_SUBPATH_FROM_ROOT = "storage";
class Storage {
    constructor(storageSubdirectoryPath, programName, subpath = "default.txt") {
        this.file = new File(this.storageDirFile, File.joinPaths(File.joinPaths(storageSubdirectoryPath, programName), subpath));
    }
    get storageDirFile() {
        return new File(new Bookmark(Installer.runtimeRootBookmarkName), this.storageDirSubpathFromRoot);
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
//# sourceMappingURL=Storage.js.map
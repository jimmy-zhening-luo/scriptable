const BOOT_RUNTIME_ROOT_SUBPATH = "!boot";
const BOOT_FILENAME = "BOOT";
const SYSTEM_CONFIG_FILENAME = "system.json";
class _System {
    static get BOOT() {
        return importModule([
            ".",
            BOOT_RUNTIME_ROOT_SUBPATH,
            BOOT_FILENAME
        ]
            .join("/"));
    }
    static get Bookmark() {
        return _System.File.Bookmark;
    }
    static get File() {
        return importModule("file/File");
    }
    static get ReadOnlyFile() {
        return _System.File.ReadOnlyFile;
    }
    static get Secret() {
        return importModule("secret/Secret");
    }
    static get CONFIG() {
        return JSON.parse(new _System.ReadOnlyFile(_System.systemRuntimeDir, SYSTEM_CONFIG_FILENAME)
            .data);
    }
    static get runtimeRootDir() {
        return new _System.ReadOnlyFile(new _System.Bookmark(_System.BOOT.RUNTIME_ROOT_BOOKMARK));
    }
    static get BOOT_RUNTIME() {
        return new _System.ReadOnlyFile(_System.runtimeRootDir, BOOT_RUNTIME_ROOT_SUBPATH);
    }
    static get systemRuntimeDir() {
        return new _System.ReadOnlyFile(_System.runtimeRootDir, _System.BOOT.SYSTEM_RUNTIME_ROOT_SUBPATH);
    }
    static get configRuntimeDir() {
        return new _System.ReadOnlyFile(_System.runtimeRootDir, _System.CONFIG
            .system
            .runtime
            .directories
            .rootSubpaths
            .config);
    }
    static get libRuntimeDir() {
        return new _System.ReadOnlyFile(_System.runtimeRootDir, _System.CONFIG
            .system
            .runtime
            .directories
            .rootSubpaths
            .lib);
    }
    static get storageRuntimeDir() {
        return new _System.ReadOnlyFile(_System.runtimeRootDir, _System.CONFIG
            .system
            .runtime
            .directories
            .rootSubpaths
            .storage);
    }
    static get programsRuntimeDir() {
        return new _System.ReadOnlyFile(_System.runtimeRootDir, _System.CONFIG
            .system
            .runtime
            .directories
            .rootSubpaths
            .programs);
    }
    static get configSourceRepoDir() {
        var _a, _b;
        const sourceRepo = _System.CONFIG
            .system
            .sourceRepo
            .directories
            .addresses
            .config;
        return new _System.ReadOnlyFile(new _System.Bookmark((_a = sourceRepo.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = sourceRepo.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static get libSourceRepoDir() {
        var _a, _b;
        const sourceRepo = _System.CONFIG
            .system
            .sourceRepo
            .directories
            .addresses
            .lib;
        return new _System.ReadOnlyFile(new _System.Bookmark((_a = sourceRepo.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = sourceRepo.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static get programsSourceRepoDir() {
        var _a, _b;
        const sourceRepo = _System.CONFIG
            .system
            .sourceRepo
            .directories
            .addresses
            .programs;
        return new _System.ReadOnlyFile(new _System.Bookmark((_a = sourceRepo.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = sourceRepo.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static get protectedFilePrefixes() {
        return _System.CONFIG
            .system
            .runtime
            .protected
            .filePrefixes;
    }
    static cleanDependencies() {
        _System.cleanConfigs();
        _System.cleanLibraries();
    }
    static install() {
        _System.cleanDependencies();
        _System.installConfigs();
        _System.installLibraries();
        _System.installPrograms();
    }
    static cleanConfigs() {
        const fm = FileManager.iCloud();
        const here = _System.configRuntimeDir.path;
        const destination = here;
        if (fm.isDirectory(destination))
            fm.remove(destination);
    }
    static installConfigs() {
        _System.cleanConfigs();
        const fm = FileManager.iCloud();
        const here = _System.configRuntimeDir.path;
        const destination = here;
        const there = _System.configSourceRepoDir.path;
        const sourceRepo = there;
        fm.copy(sourceRepo, destination);
    }
    static cleanLibraries() {
        const fm = FileManager.iCloud();
        const here = _System.libRuntimeDir.path;
        const destination = here;
        if (fm.isDirectory(destination))
            fm.remove(destination);
    }
    static installLibraries() {
        _System.cleanLibraries();
        const fm = FileManager.iCloud();
        const here = _System.libRuntimeDir.path;
        const destination = here;
        const there = _System.libSourceRepoDir.path;
        const sourceRepo = there;
        fm.copy(sourceRepo, destination);
    }
    static installPrograms() {
        const confirm = new Alert();
        confirm.message = "Initializing scripts will delete all scripts currently shown. Are you sure you want to override current runtime files?";
        confirm.addDestructiveAction("Yes, DELETE runtime");
        confirm.addCancelAction("No, cancel");
        confirm.present().then((value) => (pull(value)));
        function pull(value = -1) {
            if (value === 0) {
                const fm = FileManager.iCloud();
                const here = _System.programsRuntimeDir.path;
                const destination = here;
                const there = _System.programsSourceRepoDir.path;
                const sourceRepo = there;
                const dScripts = fm
                    .listContents(destination).filter((leaf) => (!(_System
                    .protectedFilePrefixes
                    .some((prefix) => (leaf.startsWith(prefix))))
                    && !(leaf === _System.libRuntimeDir.leaf)
                    && !(leaf === _System.BOOT_RUNTIME.leaf)
                    && !(leaf === _System.storageRuntimeDir.leaf)
                    && !(leaf === _System.configRuntimeDir.leaf)
                    && !(leaf === _System.systemRuntimeDir.leaf)
                    && !(leaf === ".Trash")));
                for (const leaf of dScripts) {
                    const dFile = fm.joinPath(destination, leaf);
                    console.log(dFile);
                    fm.remove(dFile);
                }
                const sScripts = fm
                    .listContents(sourceRepo);
                for (const leaf of sScripts) {
                    const sFile = fm.joinPath(sourceRepo, leaf);
                    const dFile = fm.joinPath(destination, leaf);
                    console.log([sFile, dFile]);
                    fm.copy(sFile, dFile);
                }
            }
        }
    }
}
module.exports = _System;

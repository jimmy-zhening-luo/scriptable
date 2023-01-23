"use strict";
const BOOT_DIR = "!boot";
const BOOT_MODULE = [
    ".",
    BOOT_DIR,
    "Boot"
].join("/");
class _System {
    static get Boot() {
        return importModule(BOOT_MODULE);
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
    static get config() {
        return JSON.parse(new _System.ReadOnlyFile(_System.systemDir, _System.Boot.SYSTEM_CONFIG_FILE)
            .data);
    }
    static get root() {
        return new _System.ReadOnlyFile(new _System.Bookmark(_System.Boot.ROOT_BOOKMARK));
    }
    static get bootDir() {
        return new _System.ReadOnlyFile(_System.root, BOOT_DIR);
    }
    static get systemDir() {
        return new _System.ReadOnlyFile(_System.root, _System.Boot.SYSTEM_DIR);
    }
    static get configDir() {
        return new _System.ReadOnlyFile(_System.root, _System.config.system["prod"]["dirs"]["config"]);
    }
    static get configSource() {
        var _a, _b;
        const source = _System.config.system
            .source
            .config
            .dir;
        return new _System.ReadOnlyFile(new _System.Bookmark((_a = source.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = source.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static get libDir() {
        return new _System.ReadOnlyFile(_System.root, _System.config.system
            .prod
            .dirs
            .lib);
    }
    static get libSource() {
        var _a, _b;
        const source = _System.config.system
            .source
            .lib
            .dir;
        return new _System.ReadOnlyFile(new _System.Bookmark((_a = source.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = source.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static get dataDir() {
        return new _System.ReadOnlyFile(_System.root, _System.config.system
            .prod
            .dirs
            .data);
    }
    static get programDir() {
        return new _System.ReadOnlyFile(_System.root, _System.config.system
            .prod
            .dirs
            .program);
    }
    static get programSource() {
        var _a, _b;
        const source = _System.config.system
            .source
            .program
            .dir;
        return new _System.ReadOnlyFile(new _System.Bookmark((_a = source.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = source.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static get protectedFilePrefix() {
        return String(_System.config.system
            .prod
            .protected
            .filePrefix);
    }
    static get externalSecretsDir() {
        var _a, _b;
        const ext = _System.config.system
            .external
            .secrets
            .dir;
        return new _System.ReadOnlyFile(new _System.Bookmark((_a = ext.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = ext.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static clean() {
        _System.cleanConfigs();
        _System.cleanLibraries();
        _System.cleanPrograms();
    }
    static install() {
        _System.clean();
        _System.installConfigs();
        _System.installLibraries();
        _System.installPrograms();
    }
    static cleanConfigs() {
    }
    static installConfigs() {
        _System.cleanConfigs();
        const fm = FileManager.iCloud();
        const here = _System.configDir.path;
        const destination = here;
        const there = _System.configSource.path;
        const source = there;
        if (fm.isDirectory(destination))
            fm.remove(destination);
        fm.copy(source, destination);
    }
    static cleanLibraries() {
    }
    static installLibraries() {
        _System.cleanLibraries();
        const fm = FileManager.iCloud();
        const here = _System.libDir.path;
        const destination = here;
        const there = _System.libSource.path;
        const source = there;
        if (fm.isDirectory(destination))
            fm.remove(destination);
        fm.copy(source, destination);
    }
    static cleanPrograms() {
    }
    static installPrograms() {
        _System.cleanPrograms();
        const confirm = new Alert();
        confirm.message = "Initializing scripts will delete all scripts currently shown. Are you sure you want to override current production files?";
        confirm.addDestructiveAction("Yes, DELETE prod");
        confirm.addCancelAction("No, cancel");
        confirm.present().then((value) => (pull(value)));
        function pull(value = -1) {
            if (value === 0) {
                const fm = FileManager.iCloud();
                const here = _System.programDir.path;
                const destination = here;
                const there = _System.programSource.path;
                const source = there;
                const dScripts = fm
                    .listContents(destination).filter((leaf) => (!leaf.startsWith(_System.protectedFilePrefix)
                    && !(leaf === _System.libDir.leaf)
                    && !(leaf === _System.bootDir.leaf)
                    && !(leaf === _System.dataDir.leaf)
                    && !(leaf === _System.configDir.leaf)
                    && !(leaf === _System.systemDir.leaf)
                    && !(leaf === ".Trash")));
                for (const leaf of dScripts) {
                    const dFile = fm.joinPath(destination, leaf);
                    console.log(dFile);
                    fm.remove(dFile);
                }
                const sScripts = fm
                    .listContents(source);
                for (const leaf of sScripts) {
                    const sFile = fm.joinPath(source, leaf);
                    const dFile = fm.joinPath(destination, leaf);
                    console.log([sFile, dFile]);
                    fm.copy(sFile, dFile);
                }
            }
        }
    }
}
module.exports = _System;
module.exports.System = _System;
module.exports.Bookmark = _System.Bookmark;
module.exports.File = _System.File;
module.exports.ReadOnlyFile = _System.ReadOnlyFile;

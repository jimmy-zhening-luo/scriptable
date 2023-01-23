"use strict";
const BOOT_DIR = "!boot";
const BOOT_MODULE = [
    ".",
    BOOT_DIR,
    "Boot"
].join("/");
importModule(BOOT_MODULE);
importModule("file/ReadOnlyFile");
importModule("file/Bookmark");
class System {
    static get config() {
        return JSON.parse(new ReadOnlyFile(System.systemDir, Boot.SYSTEM_CONFIG_FILE)
            .data);
    }
    static get root() {
        return new ReadOnlyFile(new Bookmark(Boot.ROOT_BOOKMARK));
    }
    static get bootDir() {
        return new ReadOnlyFile(System.root, BOOT_DIR);
    }
    static get systemDir() {
        return new ReadOnlyFile(System.root, Boot.SYSTEM_DIR);
    }
    static get configDir() {
        return new ReadOnlyFile(System.root, System.config.system["prod"]["dirs"]["config"]);
    }
    static get configSource() {
        var _a, _b;
        const source = System.config.system
            .source
            .config
            .dir;
        return new ReadOnlyFile(new Bookmark((_a = source.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = source.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static get libDir() {
        return new ReadOnlyFile(System.root, System.config.system
            .prod
            .dirs
            .lib);
    }
    static get libSource() {
        var _a, _b;
        const source = System.config.system
            .source
            .lib
            .dir;
        return new ReadOnlyFile(new Bookmark((_a = source.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = source.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static get dataDir() {
        return new ReadOnlyFile(System.root, System.config.system
            .prod
            .dirs
            .data);
    }
    static get programDir() {
        return new ReadOnlyFile(System.root, System.config.system
            .prod
            .dirs
            .program);
    }
    static get programSource() {
        var _a, _b;
        const source = System.config.system
            .source
            .program
            .dir;
        return new ReadOnlyFile(new Bookmark((_a = source.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = source.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static get protectedFilePrefix() {
        return String(System.config.system
            .prod
            .protected
            .filePrefix);
    }
    static get externalSecretsDir() {
        var _a, _b;
        const ext = System.config.system
            .external
            .secrets
            .dir;
        return new ReadOnlyFile(new Bookmark((_a = ext.bookmark) !== null && _a !== void 0 ? _a : String()), (_b = ext.subpath) !== null && _b !== void 0 ? _b : String());
    }
    static clean() {
        System.cleanConfigs();
        System.cleanLibraries();
        System.cleanPrograms();
    }
    static install() {
        System.clean();
        System.installConfigs();
        System.installLibraries();
        System.installPrograms();
    }
    static cleanConfigs() {
    }
    static installConfigs() {
        System.cleanConfigs();
        const fm = FileManager.iCloud();
        const here = System.configDir.path;
        const destination = here;
        const there = System.configSource.path;
        const source = there;
        if (fm.isDirectory(destination))
            fm.remove(destination);
        fm.copy(source, destination);
    }
    static cleanLibraries() {
    }
    static installLibraries() {
        System.cleanLibraries();
        const fm = FileManager.iCloud();
        const here = System.libDir.path;
        const destination = here;
        const there = System.libSource.path;
        const source = there;
        if (fm.isDirectory(destination))
            fm.remove(destination);
        fm.copy(source, destination);
    }
    static cleanPrograms() {
    }
    static installPrograms() {
        System.cleanPrograms();
        const confirm = new Alert();
        confirm.message = "Initializing scripts will delete all scripts currently shown. Are you sure you want to override current production files?";
        confirm.addDestructiveAction("Yes, DELETE prod");
        confirm.addCancelAction("No, cancel");
        confirm.present().then((value) => (pull(value)));
        function pull(value = -1) {
            if (value === 0) {
                const fm = FileManager.iCloud();
                const here = System.programDir.path;
                const destination = here;
                const there = System.programSource.path;
                const source = there;
                const dScripts = fm
                    .listContents(destination).filter((leaf) => (!leaf.startsWith(System.protectedFilePrefix)
                    && !(leaf === System.libDir.leaf)
                    && !(leaf === System.bootDir.leaf)
                    && !(leaf === System.dataDir.leaf)
                    && !(leaf === System.configDir.leaf)
                    && !(leaf === System.systemDir.leaf)
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
importModule("file/File");
module.exports = System;
module.exports.File = File;
module.exports.ReadOnlyFile = ReadOnlyFile;
module.exports.Bookmark = Bookmark;

class Application {
    run() {
        return this.handleOutput(this.runtime(this.input));
    }
    get configSubdirectoryPath() {
        return String("Application");
    }
    get storageSubdirectoryPath() {
        return this.configSubdirectoryPath;
    }
    get config() {
        const _Config = importModule("appdata/Config");
        return new _Config(this.configSubdirectoryPath, this.constructor.name);
    }
    storage(subpath) {
        const _Storage = importModule("appdata/Storage");
        return new _Storage(this.storageSubdirectoryPath, this.constructor.name, subpath);
    }
    readStorage(subpath) {
        return this
            .storage(subpath)
            .read();
    }
    writeStorage(text, subpath) {
        this
            .storage(subpath)
            .write(text);
    }
}
module.exports = Application;
//# sourceMappingURL=Application.js.map
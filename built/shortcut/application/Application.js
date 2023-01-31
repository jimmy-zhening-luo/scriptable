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
        return new Config(this.configSubdirectoryPath, this.constructor.name);
    }
    storage(subpath) {
        return new Storage(this.storageSubdirectoryPath, this.constructor.name, subpath);
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
//# sourceMappingURL=Application.js.map
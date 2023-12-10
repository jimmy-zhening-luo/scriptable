"use strict";
class Application {
    static get Filetypes() {
        try {
            return importModule("filetypes/Filetypes");
        }
        catch (e) {
            throw new ReferenceError(`Application: Filetypes: Error importing Filetypes module: \n${e}`);
        }
    }
    get config() {
        try {
            return new Application.Filetypes.Config(this.configSubpathRoot, this.constructor.name);
        }
        catch (e) {
            throw new ReferenceError(`Application: config: Error getting application Config object: \n${e}`);
        }
    }
    get configSubpathRoot() {
        try {
            return "";
        }
        catch (e) {
            throw new ReferenceError(`Application: configSubpath: Error getting application config subpath: \n${e}`);
        }
    }
    get storageSubpathRoot() {
        try {
            return this.configSubpathRoot;
        }
        catch (e) {
            throw new ReferenceError(`Application: storageSubpath: Error getting application storage subpath: \n${e}`);
        }
    }
    run() {
        try {
            return this.handleOutput(this.runtime());
        }
        catch (e) {
            throw new EvalError(`Application: run: Caught unhandled exception during application runtime: \n${e}`);
        }
    }
    readStorage(subpath) {
        try {
            return this.storage(subpath)
                .read();
        }
        catch (e) {
            throw new ReferenceError(`Application: readStorage: Error reading application storage file at '${this.storage(subpath).path}': \n${e}`);
        }
    }
    writeStorage(data, subpath) {
        try {
            this.storage(subpath)
                .write(data);
            return this;
        }
        catch (e) {
            throw new ReferenceError(`Application: writeStorage: Error writing to application storage file at '${this.storage(subpath).path}': \n${e}`);
        }
    }
    storage(subpath) {
        try {
            return new Application.Filetypes.Storage(this.storageSubpathRoot, this.constructor.name, subpath);
        }
        catch (e) {
            throw new ReferenceError(`Application: storage: Error getting application Storage object: \n${e}`);
        }
    }
}
module.exports = Application;

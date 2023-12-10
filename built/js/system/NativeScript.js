"use strict";
const sc_Application = importModule("application/Application");
class NativeScript extends sc_Application {
    static get Application() {
        try {
            return sc_Application;
        }
        catch (e) {
            throw new ReferenceError(`NativeScript.js: Error getting shortcut Application class: \n${e}`);
        }
    }
    get input() {
        throw new ReferenceError(`NativeScript.js: input: the NativeScript tried to access its 'input' member, but NativeScripts are not allowed to have input.`);
    }
    get configSubpathRoot() {
        try {
            const SCRIPTABLE_CONFIG_SUBPATH_ROOT = "NativeScript";
            return super.configSubpathRoot === ""
                ? SCRIPTABLE_CONFIG_SUBPATH_ROOT
                : `${super.configSubpathRoot}/${SCRIPTABLE_CONFIG_SUBPATH_ROOT}`;
        }
        catch (e) {
            throw new EvalError(`NativeScript.js: Error getting shortcut config subpath: \n${e}`);
        }
    }
    handleOutput() { }
}
module.exports = NativeScript;

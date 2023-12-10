"use strict";
const key_Filetype = importModule("filetype/Filetype");
class Secret extends key_Filetype {
    constructor(subpath) {
        try {
            super("Secret", subpath);
        }
        catch (e) {
            throw new EvalError(`Secret: constructor: Error creating Secret object: \n${e}`);
        }
    }
    static get Filetype() {
        try {
            return key_Filetype;
        }
        catch (e) {
            throw new ReferenceError(`Secret: Utility: Error importing Utility module: \n${e}`);
        }
    }
}
module.exports = Secret;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const stor_Filetype = importModule("filetype/Filetype");
class Storage extends stor_Filetype {
    constructor(storageSubpath, programName, subpath = "default.txt") {
        try {
            super("Storage", Storage.IOFile.join(storageSubpath, programName, subpath), Storage.IOFile);
        }
        catch (e) {
            throw new EvalError(`Storage: constructor: Error creating Storage object: \n${e}`);
        }
    }
    static get Filetype() {
        try {
            return stor_Filetype;
        }
        catch (e) {
            throw new ReferenceError(`Storage: get Utility: Error importing Utility module: \n${e}`);
        }
    }
    write(text) {
        try {
            this._file.write(text, true);
            return this;
        }
        catch (e) {
            throw new EvalError(`Storage: write: Error writing to file: \n${e}`);
        }
    }
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this._file.delete();
                return this;
            }
            catch (e) {
                throw new EvalError(`Storage: delete: Error deleting file: \n${e}`);
            }
        });
    }
}
module.exports = Storage;

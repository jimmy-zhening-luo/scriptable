"use strict";
class Filetypes {
    static get Filetype() {
        return Filetypes.Config.Filetype;
    }
    static get IOFile() {
        return Filetypes.Filetype.IOFile;
    }
    static get ReadOnlyIOFile() {
        return Filetypes.Filetype.ReadOnlyIOFile;
    }
    static get Config() {
        return importModule("Config");
    }
    static get Secret() {
        return importModule("Secret");
    }
    static get Storage() {
        return importModule("Storage");
    }
}
module.exports = Filetypes;

;
class _Config {
    constructor(configSubdirectory, programName) {
        this.file = new _Config.ReadOnlyFile(_Config.System.configRuntimeDir, _Config.ReadOnlyFile.joinPaths(configSubdirectory, [programName, "json"]
            .join(".")));
    }
    static get System() {
        return importModule("./system/System");
    }
    static get ReadOnlyFile() {
        return _Config.System.ReadOnlyFile;
    }
    get path() {
        return this.file.path;
    }
    get isParseable() {
        try {
            JSON.parse(this.file.data);
            return true;
        }
        catch (e) {
            return false;
        }
    }
    get parsed() {
        return this.isParseable ?
            JSON.parse(this.file.data)
            : {};
    }
    get unmerged() {
        return this.parsed;
    }
    get app() {
        return this.unmerged.app;
    }
    get user() {
        return this.unmerged.user;
    }
    get merged() {
        return _Config.mergeSettings(this.user, this.app);
    }
    get mergedUserOverridesProhibited() {
        return _Config.mergeSettings(this.app, this.user);
    }
    toString() {
        return this.file.data;
    }
    static mergeSettings(winningSettings, losingSettings) {
        if (winningSettings === undefined && losingSettings !== undefined)
            return losingSettings;
        else if (losingSettings === undefined && winningSettings !== undefined)
            return winningSettings;
        else if (losingSettings !== undefined && winningSettings !== undefined) {
            const commonSettingKeys = intersectKeys(winningSettings, losingSettings);
            const keysUniqueToWinningSettings = uniqueKeysOf(winningSettings, commonSettingKeys);
            const keysUniqueToLosingSettings = uniqueKeysOf(losingSettings, commonSettingKeys);
            const mergedSettingsMap = new Map();
            for (const loser of keysUniqueToLosingSettings)
                mergedSettingsMap.set(loser, losingSettings[loser]);
            for (const winner of keysUniqueToWinningSettings)
                mergedSettingsMap.set(winner, winningSettings[winner]);
            for (const key of commonSettingKeys) {
                if (isPrimitive(winningSettings[key])
                    && isPrimitive(losingSettings[key]))
                    mergedSettingsMap.set(key, winningSettings[key]);
                else if (Array.isArray(winningSettings[key])
                    && Array.isArray(losingSettings[key]))
                    mergedSettingsMap.set(key, mergeArrays(winningSettings[key], losingSettings[key]));
                else if (Array.isArray(winningSettings[key]))
                    mergedSettingsMap.set(key, mergeArrays(winningSettings[key], [losingSettings[key]]));
                else if (Array.isArray(losingSettings[key]))
                    mergedSettingsMap.set(key, mergeArrays([winningSettings[key]], losingSettings[key]));
                else
                    mergedSettingsMap.set(key, _Config.mergeSettings(winningSettings[key], losingSettings[key]));
            }
            return Object.fromEntries(mergedSettingsMap);
        }
        else
            return {};
        function isPrimitive(obj) {
            return ((obj === null || obj === void 0 ? void 0 : obj.constructor) === String
                || (obj === null || obj === void 0 ? void 0 : obj.constructor) === Number
                || (obj === null || obj === void 0 ? void 0 : obj.constructor) === Boolean);
        }
        function mergeArrays(winner, loser) {
            return winner.concat(loser);
        }
        function intersectKeys(a, b) {
            return Object.keys(a)
                .filter((aKey) => (Object.keys(b).includes(aKey)));
        }
        function uniqueKeysOf(obj, commonSettingKeys) {
            return Object.keys(obj)
                .filter((objKey) => (!commonSettingKeys.includes(objKey)));
        }
    }
}
class _Storage {
    constructor(storageSubdirectory, programName, subpath) {
        this.file = new _Storage.System.File(_Storage.System.storageRuntimeDir, _Storage.System.File.joinPaths(_Storage.System.File.joinPaths(storageSubdirectory, programName), subpath !== null && subpath !== void 0 ? subpath : String("default.txt")));
    }
    static get System() {
        return importModule("./system/System");
    }
    get path() {
        return this.file.path;
    }
    get data() {
        return this.file.data;
    }
    read() {
        return this.data;
    }
    write(text) {
        const overwrite = true;
        this.file.write(text, overwrite);
    }
    toString() {
        return this.data;
    }
}
// module.exports = _Program;
// module.exports.Program = _Program;
// module.exports.Shortcut = _Shortcut;
// module.exports.Script = _Script;
module.exports.Config = _Config;
module.exports.Storage = _Storage;

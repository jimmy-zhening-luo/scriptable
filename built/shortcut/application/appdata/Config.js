const CONFIG_DIR_SUBPATH_FROM_ROOT = "config";
class Config {
    constructor(configSubdirectoryPath, programName) {
        this.file = new ReadOnlyFile(this.configDirFile, File.joinPaths(configSubdirectoryPath, [programName, "json"]
            .join(".")));
    }
    get configDirFile() {
        const installer = importModule("./!boot/Boot");
        return new File(new Bookmark(installer.runtimeRootBookmarkName), this.configDirSubpathFromRoot);
    }
    get configDirSubpathFromRoot() {
        return CONFIG_DIR_SUBPATH_FROM_ROOT;
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
        return this.mergeSettings(this.user, this.app);
    }
    get mergedUserOverridesProhibited() {
        return this.mergeSettings(this.app, this.user);
    }
    toString() {
        return this.file.data;
    }
    mergeSettings(winningSettings, losingSettings) {
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
                    mergedSettingsMap.set(key, this.mergeSettings(winningSettings[key], losingSettings[key]));
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
(function (Config) {
    ;
})(Config || (Config = {}));
//# sourceMappingURL=Config.js.map
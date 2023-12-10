"use strict";
const cfg_Filetype = importModule("filetype/Filetype");
class Config extends cfg_Filetype {
    constructor(configSubpath, programName) {
        try {
            super("Config", Config.IOFile.join(configSubpath, `${programName}.json`));
        }
        catch (e) {
            throw new EvalError(`Config: constructor: Error creating Config object: \n${e}`);
        }
    }
    static get Filetype() {
        try {
            return cfg_Filetype;
        }
        catch (e) {
            throw new ReferenceError(`Config: Error importing Utility module: \n${e}`);
        }
    }
    get isParseable() {
        try {
            if (!this.isFile)
                throw new ReferenceError(`Config.js: Config file '${this.path}' does not exist.`);
            else {
                JSON.parse(this.read());
                return true;
            }
        }
        catch (_a) {
            return false;
        }
    }
    get parsed() {
        try {
            if (this._cachedConfig !== undefined)
                return this._cachedConfig;
            else {
                if (!this.isParseable)
                    throw new SyntaxError(`Config.js: Config file '${this.path}' is not parseable as JSON.`);
                else {
                    const parsedJson = JSON.parse(this.read());
                    if (_validate(parsedJson)) {
                        this._cachedConfig = parsedJson;
                        return this._cachedConfig;
                    }
                    else
                        throw new SyntaxError(`Config.js: Config file '${this.path}' is valid JSON but not a valid Application Config.`);
                    function _validate(parsedJson) {
                        try {
                            // TO-DO: Validate JSON schema.
                            return parsedJson !== undefined;
                        }
                        catch (e) {
                            throw new EvalError(`Config.js: Error while validating whether parsed JSON is matches the ApplicationConfigProto: \n${e}`);
                        }
                    }
                }
            }
        }
        catch (e) {
            throw new EvalError(`Config.js: Error while parsing config file '${this.path}': \n${e}`);
        }
    }
    get unmerged() {
        try {
            return this.parsed;
        }
        catch (e) {
            throw new EvalError(`Config.js: Error getting unmerged config file '${this.path}': \n${e}`);
        }
    }
    get app() {
        try {
            if (this.unmerged.app === undefined)
                throw new ReferenceError(`Config.js: Config file '${this.path}' does not contain an 'app' property.`);
            else
                return this.unmerged.app;
        }
        catch (e) {
            throw new EvalError(`Config.js: Error getting 'app' property from config file '${this.path}': \n${e}`);
        }
    }
    get user() {
        try {
            if (this.unmerged.user === undefined)
                throw new ReferenceError(`Config.js: Config file '${this.path}' does not contain a 'user' property.`);
            else
                return this.unmerged.user;
        }
        catch (e) {
            throw new EvalError(`Config.js: Error getting 'user' property from config file '${this.path}': \n${e}`);
        }
    }
    get merged() {
        try {
            return this.mergeSettings(this.user, this.app);
        }
        catch (e) {
            throw new EvalError(`Config.js: Error merging 'user' and 'app' properties from config file '${this.path}': \n${e}`);
        }
    }
    get mergedUserOverridesProhibited() {
        try {
            return this.mergeSettings(this.app, this.user);
        }
        catch (e) {
            throw new EvalError(`Config.js: Error merging 'user' and 'app' properties from config file '${this.path}': \n${e}`);
        }
    }
    mergeSettings(winningSettings, losingSettings) {
        try {
            if (winningSettings === undefined && losingSettings !== undefined)
                return losingSettings;
            else if (losingSettings === undefined && winningSettings !== undefined)
                return winningSettings;
            else if (losingSettings !== undefined && winningSettings !== undefined) {
                const commonSettingKeys = intersectKeys(winningSettings, losingSettings);
                const keysUniqueToWinningSettings = uniqueKeysOf(winningSettings, commonSettingKeys);
                const keysUniqueToLosingSettings = uniqueKeysOf(losingSettings, commonSettingKeys);
                const mergedSettingsMap = new Map();
                const losingSettingsMap = new Map(Object.entries(losingSettings));
                const winningSettingsMap = new Map(Object.entries(winningSettings));
                for (const loser of keysUniqueToLosingSettings)
                    mergedSettingsMap.set(loser, losingSettingsMap.get(loser));
                for (const winner of keysUniqueToWinningSettings)
                    mergedSettingsMap.set(winner, winningSettingsMap.get(winner));
                for (const key of commonSettingKeys) {
                    if (isPrimitive(winningSettingsMap.get(key))
                        && isPrimitive(losingSettingsMap.get(key)))
                        mergedSettingsMap.set(key, winningSettingsMap.get(key));
                    else if (Array.isArray(winningSettingsMap.get(key))
                        && Array.isArray(losingSettingsMap.get(key)))
                        mergedSettingsMap.set(key, mergeArrays(winningSettingsMap.get(key), losingSettingsMap.get(key)));
                    else if (Array.isArray(winningSettingsMap.get(key)))
                        mergedSettingsMap.set(key, mergeArrays(winningSettingsMap.get(key), [losingSettingsMap.get(key)]));
                    else if (Array.isArray(losingSettingsMap.get(key)))
                        mergedSettingsMap.set(key, mergeArrays([winningSettingsMap.get(key)], losingSettingsMap.get(key)));
                    else
                        mergedSettingsMap.set(key, this.mergeSettings(winningSettingsMap.get(key), losingSettingsMap.get(key)));
                }
                return Object.fromEntries(mergedSettingsMap);
            }
            else
                return {};
        }
        catch (e) {
            throw new SyntaxError(`Config.js: Error merging settings from config file '${this.path}': \n${e}`);
        }
        function isPrimitive(obj) {
            try {
                return (typeof obj === "string"
                    || typeof obj === "number"
                    || typeof obj === "boolean");
            }
            catch (e) {
                throw new EvalError(`Config.js: Error determining whether object is primitive: \n${e}`);
            }
        }
        function mergeArrays(winner, loser) {
            try {
                return winner.concat(loser);
            }
            catch (e) {
                throw new EvalError(`Config.js: Error merging arrays: \n${e}`);
            }
        }
        function intersectKeys(a, b) {
            try {
                return Object.keys(a)
                    .filter(keyOfA => Object.keys(b)
                    .includes(keyOfA));
            }
            catch (e) {
                throw new EvalError(`Config.js: Error intersecting keys: \n${e}`);
            }
        }
        function uniqueKeysOf(obj, sharedKeys) {
            try {
                return Object.keys(obj)
                    .filter(objKey => !sharedKeys.includes(objKey));
            }
            catch (e) {
                throw new EvalError(`Config.js: Error getting unique keys of object: \n${e}`);
            }
        }
    }
}
module.exports = Config;

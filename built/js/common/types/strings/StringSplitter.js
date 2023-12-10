"use strict";
class StringSplitter {
    constructor(stringOrTokens, separator = "", splitOptions = {}, mergeOptions = {}) {
        try {
            this.separator = separator;
            this._merged = StringSplitter._merge(stringOrTokens, this.separator, splitOptions, mergeOptions);
        }
        catch (e) {
            throw new Error(`StringSplitter: constructor: Error creating StringSplitter object: \n${e}`);
        }
    }
    static get PositiveInteger() {
        try {
            return importModule("./common/types/numbers/PositiveInteger");
        }
        catch (e) {
            throw new ReferenceError(`StringSplitter: error importing PositiveInteger module: \n${e}`);
        }
    }
    get numTokens() {
        try {
            return this.separator === ""
                ? this.toString().length
                : this.toString()
                    .split(this.separator).length;
        }
        catch (e) {
            throw new EvalError(`StringSplitter: numTokens: Error getting number of raw tokens: \n${e}`);
        }
    }
    get length() {
        try {
            return this.toTuple().length;
        }
        catch (e) {
            throw new EvalError(`StringSplitter: length: Error getting length of merged array: \n${e}`);
        }
    }
    get wasMerged() {
        try {
            return this.length < this.numTokens;
        }
        catch (e) {
            throw new EvalError(`StringSplitter: didMerge: Error checking if merge occurred during construction: \n${e}`);
        }
    }
    static _merge(stringOrTokens, separator = "", splitOptions = {}, { limit = Infinity, mergeTo = StringSplitter.Direction.Right, }) {
        var _a;
        try {
            limit = (_a = new StringSplitter.PositiveInteger(limit).value) !== null && _a !== void 0 ? _a : Infinity;
            const tokens = StringSplitter._split(stringOrTokens, separator, splitOptions);
            if (tokens.length === 0)
                return [];
            else {
                if (limit === Infinity)
                    return tokens;
                else {
                    if (mergeTo === StringSplitter.Direction.Left)
                        return [
                            tokens.slice(0, limit - 1)
                                .join(separator),
                            ...tokens.slice(limit - 1),
                        ];
                    else
                        return [
                            ...tokens.slice(0, limit - 1),
                            tokens.slice(limit - 1)
                                .join(separator),
                        ];
                }
            }
        }
        catch (e) {
            throw new EvalError(`StringSplitter: merge: Error merging tokens: \n${e}`);
        }
    }
    static _split(stringOrTokens, separator = "", { trim = false, trimTokens = false, ignoreEmptyTokens = false, }) {
        try {
            return StringSplitter.__tokenize(StringSplitter.__aggregate(stringOrTokens, separator)[trim
                ? "trim"
                : "toString"](), separator)
                .map(token => trimTokens
                ? token.trim()
                : token)
                .filter(token => !ignoreEmptyTokens || token !== "");
        }
        catch (e) {
            throw new EvalError(`StringSplitter: split: Error splitting string: \n${e}`);
        }
    }
    static __aggregate(stringOrTokens, separator = "") {
        try {
            return StringSplitter.__tokenize(stringOrTokens, separator)
                .join(separator);
        }
        catch (e) {
            throw new EvalError(`StringSplitter: aggregate: Error aggregating tokens: \n${e}`);
        }
    }
    static __tokenize(stringOrTokens, separator = "") {
        try {
            if (typeof stringOrTokens === "string") {
                if (stringOrTokens === "")
                    return [];
                else {
                    if (separator === "")
                        return [...stringOrTokens];
                    else
                        return stringOrTokens.split(separator);
                }
            }
            else
                return [...stringOrTokens];
        }
        catch (e) {
            throw new EvalError(`StringSplitter: tokenize: Error tokenizing string: \n${e}`);
        }
    }
    toTuple() {
        try {
            return [...this._merged];
        }
        catch (e) {
            throw new EvalError(`StringSplitter: toTuple: Error converting to tuple: \n${e}`);
        }
    }
    toString() {
        try {
            return this.toTuple()
                .join(this.separator);
        }
        catch (e) {
            throw new EvalError(`StringSplitter: toString: Error converting to string: \n${e}`);
        }
    }
}
(function (StringSplitter) {
    let Direction;
    (function (Direction) {
        Direction[Direction["Left"] = 0] = "Left";
        Direction[Direction["Right"] = 1] = "Right";
    })(Direction = StringSplitter.Direction || (StringSplitter.Direction = {}));
})(StringSplitter || (StringSplitter = {}));
module.exports = StringSplitter;

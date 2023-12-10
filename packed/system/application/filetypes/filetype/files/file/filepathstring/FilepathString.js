"use strict";
class FilepathString {
    constructor(...filepaths) {
        this._nominalType = "FilepathString";
        try {
            if (filepaths.length === 0)
                this._tree = [];
            else {
                const filepath = filepaths.shift();
                this._tree
                    = filepath instanceof FilepathString
                        ? [...filepath._tree]
                        : [...FilepathString._validate(filepath)];
                if (filepaths.length > 0)
                    this._tree = [
                        ...this._tree,
                        ...new FilepathString(...filepaths)._tree,
                    ];
            }
        }
        catch (e) {
            throw new SyntaxError(`FilepathString: constructor: Caught unhandled exception while instantiating FilepathString by parsing path: \n${e}`);
        }
    }
    static get ValidFilepathRepeater() {
        try {
            return importModule("validfilepathrepeater/ValidFilepathRepeater");
        }
        catch (e) {
            throw new ReferenceError(`Filepath: Failed to import module ValidFilepathRepeater: \n${e}`);
        }
    }
    static get StringSplitter() {
        try {
            return importModule("./common/types/strings/StringSplitter");
        }
        catch (e) {
            throw new ReferenceError(`Filepath: Failed to import module StringSplitter: \n${e}`);
        }
    }
    get isEmpty() {
        try {
            return this._tree.length === 0;
        }
        catch (e) {
            throw new EvalError(`FilepathString: get isEmpty: Caught unhandled exception while getting isEmpty: \n${e}`);
        }
    }
    get parent() {
        try {
            const parent = new FilepathString(this);
            parent._tree.pop();
            return parent;
        }
        catch (e) {
            throw new EvalError(`FilepathString: get parent: Caught unhandled exception while getting parent: \n${e}`);
        }
    }
    get leaf() {
        var _a;
        try {
            const selfCopy = [...this._tree];
            const leaf = (_a = selfCopy.pop()) !== null && _a !== void 0 ? _a : "";
            return leaf;
        }
        catch (e) {
            throw new EvalError(`FilepathString: get leaf: Caught unhandled exception while getting leaf: \n${e}`);
        }
    }
    static [Symbol.hasInstance](instance) {
        try {
            return (instance !== null
                && instance !== undefined
                && typeof instance === "object"
                && "_nominalType" in instance
                && instance._nominalType === "FilepathString");
        }
        catch (e) {
            throw new EvalError(`FilepathString: [Symbol.hasInstance]: Caught unhandled exception while checking if instance is a FilepathString: \n${e}`);
        }
    }
    static join(...filepaths) {
        try {
            return new FilepathString(...filepaths)
                .toString();
        }
        catch (e) {
            throw new SyntaxError(`FilepathString: static join: Caught unhandled exception while creating a new FilepathString to join paths: \n${e}`);
        }
    }
    static _validate(filepath) {
        try {
            const cleaned = __clean(filepath);
            return cleaned.some(node => new FilepathString.ValidFilepathRepeater(node).value === null)
                ? []
                : [...cleaned];
            function __clean(filepath) {
                try {
                    return new FilepathString.StringSplitter(___treeifyRaw(filepath), "/", {
                        trim: true,
                        trimTokens: true,
                        ignoreEmptyTokens: true,
                    })
                        .toTuple();
                    function ___treeifyRaw(filepath) {
                        try {
                            return (Array.isArray(filepath)
                                ? filepath.join("/")
                                : filepath).split("/");
                        }
                        catch (e) {
                            throw new SyntaxError(`FilepathString: __treeifyRaw: Caught unhandled exception while treeifying raw path: \n${e}`);
                        }
                    }
                }
                catch (e) {
                    throw new SyntaxError(`FilepathString: _clean: Caught unhandled exception while cleaning path using StringSplitter instance: \n${e}`);
                }
            }
        }
        catch (e) {
            throw new SyntaxError(`FilepathString: _validate: Caught unhandled exception while validating path: \n${e}`);
        }
    }
    append(...filepaths) {
        try {
            return new FilepathString(this, ...filepaths);
        }
        catch (e) {
            throw new SyntaxError(`FilepathString: append: Caught unhandled exception while appending path by calling private FilepathString._walk(): \n${e}`);
        }
    }
    cd(relativeFilepath) {
        try {
            const relativeTree = [
                ...new FilepathString(relativeFilepath)
                    .toTree(),
            ];
            for (const node of relativeTree) {
                if (node === "..")
                    this._tree.pop();
                else
                    this._tree.push(node);
            }
            return this;
        }
        catch (e) {
            throw new SyntaxError(`FilepathString: cd: Caught unhandled exception while changing directories by calling private FilepathString._walk(): \n${e}`);
        }
    }
    toTree() {
        try {
            return [...this._tree];
        }
        catch (e) {
            throw new EvalError(`FilepathString: toTree: Caught unhandled exception while getting tree: \n${e}`);
        }
    }
    toString() {
        try {
            return this.toTree()
                .join("/");
        }
        catch (e) {
            throw new EvalError(`FilepathString: toString: Caught unhandled exception while getting path: \n${e}`);
        }
    }
}
module.exports = FilepathString;

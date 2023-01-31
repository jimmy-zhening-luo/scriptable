"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Secret = void 0;
const EXTERNAL_SECRETS_BOOKMARK_NAME = "#Secrets";
class Secret {
    constructor(subpath) {
        this.file = new ReadOnlyFile(new Bookmark(this.externalSecretsBookmarkName), subpath);
    }
    get externalSecretsBookmarkName() {
        return EXTERNAL_SECRETS_BOOKMARK_NAME;
    }
    get exists() {
        return this.file.exists;
    }
    get path() {
        return this.file.path;
    }
    get subpath() {
        return this.file.subpath;
    }
    get filename() {
        return this.file.leaf;
    }
    get secret() {
        return this.file.data;
    }
    get key() {
        return this.secret;
    }
    read() {
        return this.secret;
    }
    toString() {
        return this.secret;
    }
}
exports.Secret = Secret;
//# sourceMappingURL=Secret.js.map
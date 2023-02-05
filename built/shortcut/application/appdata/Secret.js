const EXTERNAL_SECRETS_BOOKMARK_NAME = "#Secrets";
class Secret {
    constructor(subpath) {
        const _ReadOnlyFile = importModule("filesystem/ReadOnlyFile");
        const _Bookmark = importModule("filesystem/file/bookmark/Bookmark");
        this.file = new _ReadOnlyFile(new _Bookmark(this.externalSecretsBookmarkName), subpath);
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
module.exports = Secret;
//# sourceMappingURL=Secret.js.map
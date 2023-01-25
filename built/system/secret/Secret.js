const EXTERNAL_SECRETS_BOOKMARK = "#Secrets";
class _Secret {
    constructor(subpath) {
        this.file = new _Secret.ReadOnlyFile(new _Secret.Bookmark(_Secret
            .EXTERNAL_SECRETS_BOOKMARK), subpath);
    }
    static get Bookmark() {
        return _Secret.File.Bookmark;
    }
    static get File() {
        return importModule("file/File");
    }
    static get ReadOnlyFile() {
        return _Secret.File.ReadOnlyFile;
    }
    static get EXTERNAL_SECRETS_BOOKMARK() {
        return EXTERNAL_SECRETS_BOOKMARK;
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
module.exports = _Secret;

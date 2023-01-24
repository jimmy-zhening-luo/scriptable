const EXTERNAL_SECRETS_BOOKMARK = "Local/Secrets";

class _Secret {
  readonly file: typeof _Secret.File.ReadOnlyFile;
  constructor (
    subpath: string
  ) {
    this.file = new _Secret.File.ReadOnlyFile(
      new _Secret.File.Bookmark(
        EXTERNAL_SECRETS_BOOKMARK
      ),
      subpath
    );
  }

  private static get File() {
    return importModule("file/File");
  }

  get secret(): string {
    return this.file.data;
  }

  get key(): string {
    return this.secret;
  }

  read(): string {
    return this.secret;
  }

  toString(): string {
    return this.secret;
  }
}

module.exports = _Secret;

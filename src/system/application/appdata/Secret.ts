const EXTERNAL_SECRETS_BOOKMARK_NAME: string = "#Secrets";


class Secret {
  private readonly file: ReadOnlyFile;
  constructor(
    subpath: string
  ) {
    const _ReadOnlyFile: typeof ReadOnlyFile = importModule("filesystem/ReadOnlyFile");
    const _Bookmark: typeof Bookmark = importModule("filesystem/file/bookmark/Bookmark");
    this.file = new _ReadOnlyFile(
      new _Bookmark(this.externalSecretsBookmarkName),
      subpath
    );
  }

  private get externalSecretsBookmarkName(): string {
    return EXTERNAL_SECRETS_BOOKMARK_NAME;
  }

  get exists(): boolean {
    return this.file.exists;
  }

  get path(): string {
    return this.file.path;
  }

  get subpath(): string {
    return this.file.subpath;
  }

  get filename(): string {
    return this.file.leaf;
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

module.exports = Secret;


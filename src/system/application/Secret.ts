const EXTERNAL_SECRETS_BOOKMARK_NAME: string = "#Secrets";

class Secret {

  private readonly file: ReadOnlyFile;

  constructor(
    subpath: string
  ) {
    this.file = new Secret.ReadOnlyFile(
      new Secret.ReadOnlyFile.Bookmark(
        this.externalSecretsBookmarkName
      ),
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

  get ReadOnlyFile(): typeof ReadOnlyFile {
    return Secret.ReadOnlyFile;
  }

  get Paths(): typeof Filepath {
    return Secret.Paths;
  }

  static get ReadOnlyFile(): typeof ReadOnlyFile {
    return importModule("files/ReadOnlyFile");
  }

  static get Paths(): typeof Filepath {
    return Secret.ReadOnlyFile.Paths;
  }

}

module.exports = Secret;

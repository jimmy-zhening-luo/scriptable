/// <reference path="./Files.ts" />
namespace Files {
  const EXTERNAL_SECRETS_BOOKMARK: string = "#Secrets";

  export class Secret {
    private readonly file: typeof Secret.File.ReadOnlyFile;
    constructor(
      subpath: string
    ) {
      this.file = new Secret.ReadOnlyFile(
        new Secret.Bookmark(
          Secret
            .EXTERNAL_SECRETS_BOOKMARK
        ),
        subpath
      );
    }

    private static get Bookmark() {
      return Secret.File.Bookmark;
    }

    private static get File() {
      return importModule("file/File");
    }

    private static get ReadOnlyFile() {
      return Secret.File.ReadOnlyFile;
    }

    private static get EXTERNAL_SECRETS_BOOKMARK() {
      return EXTERNAL_SECRETS_BOOKMARK;
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
}

const se_Utility: typeof Utility = importModule("utility/Utility");


class Secret extends se_Utility {

  private readonly _APPLICATION_CONFIG_BOOKMARK: string = "@_APPLICATION_CONFIG";

  constructor(
    subpath: string
  ) {
    super(
      Secret.ReadOnlyFile,
      new Secret.ReadOnlyFile.Bookmark(
        Secret._secretBookmarkName
      ),
      subpath
    );
  }

  get secret(): typeof Secret.prototype.data {
    return this.data;
  }

  get key(): typeof Secret.prototype.secret {
    return this.secret;
  }

  private static get _secretBookmarkName(): string {
    return Secret._applicationConfig.Secret;
  }

}

module.exports = Secret;

abstract class Repository {
  
  private readonly url: Url;
  private readonly repo: Types.stringful;
  
  constructor(
    repo: Types.stringful
  ) {
    this.url = this.instantiateUrl();
    this.repo = repo;
  }
  
  private abstract get scheme(): Types.stringful;
  
  private abstract get host(): Types.stringful;
  
  private abstract get actions(): Repository.Actions;
  
  private abstract get secret(): string;
  
  private abstract attachRepoToUrl(url: Url): Url;
  
  private abstract attachSecretToUrl(url: Url): Url;
  
  private instantiateUrl(
    repo: Types.stringful
  ): Url {
    return new Repository._Url(
      this.scheme,
      this.host
    );
  }
  
  private createActionUrl(
    action: keyof Repository.Actions
  ): Url {
    return this.attachSecretToUrl(
      this.attachRepoToUrl(
        new Repository._Url(
          FileManager.iCloud().joinPath(
            this.url.toString(),
            Repository.Actions[action]
          )
        )
      )
    );
  }
  
  checkout(
    branch: Types.stringful
  ) {
    this
      .createActionUrl("checkout")
      .addParam()
      .open();
  }
  
  pull()
  
}

namespace Repository {
  
  export enum Id {
    Branch,
    Repo,
    Secret,
    Message
  }
  
  export type Actions = {
    checkout: ActionParams,
    pull: ActionParams,
    commit: ActionParams,
    push: ActionParams,
  }
  
  export type ActionParams = {
    path: string,
    query: string,
    ids?: PartsParams[]
  }
  
  export type IdParams = {
    id: Id,
    urlpart: UrlPart,
    prepend: string
  }
  
  export enum UrlPart {
    Path,
    Query
  }
  
  export const _Url: typeof Url = importModule("./system/application/browser/Url");
  
}

module.exports = Repository;

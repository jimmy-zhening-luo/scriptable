abstract class Repository {
  
  private readonly urlRoot: Url;
  private readonly repo: Types.stringful;
  private readonly secret: string;
  private readonly actions: Readonly<
    Record<
      Repository.Action,
      Repository.ActionHandler
    >
  >;
  
  constructor(
    scheme: Types.stringful,
    host: string,
    repo: Types.stringful,
    secret: string,
    actions?: typeof Repository.prototype.actions
  ) {
    this.urlRoot = this.instantiateRootUrl();
    this.repo = repo;
    this.secret = secret;
    this.actions = actions ?? {};
  }
  
  private instantiateRootUrl(
    scheme: Types.stringful,
    host: string
  ): Url {
    return new Repository._Url(
      this.scheme,
      this.host
    );
  }
  
  private takeAction(
    action: Repository.Action
  ): any {
    
    
    
    function createActionUrl(
      action: Repository.Actionq
    ): Url {
      
      
      
      function attachIds(
        url: Url
      ): Url {
        
      }
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
  
  export enum Action {
    Checkout,
    Pull,
    Commit,
    Push
  }
  
  export type Actions = {
    checkout: ActionParams,
    pull: ActionParams,
    commit: ActionParams,
    push: ActionParams,
  }
  
  export class ActionHandler {
    readonly path: string;
    readonly query: string;
    readonly ids: IdConfig[];
    
    constructor(
      path: string,
      query: string,
      ...ids: IdConfig[]
    ) {
      this.path = path;
      this.query = query;
      this.ids = ids;
    }
  }
  
  export class Id {
    id: Id;
    urlpart: UrlPart;
    prepend: string;
    
    constructor(
      id: Id,
      urlpart: UrlPart,
      prepend?: string
    ) {
      this.id = id;
      this.urlpart = urlpart;
      this.prepend = prepend ?? "";
    }
  }
  
  export enum UrlPart {
    Path,
    Query
  }
  
  export const _Url: typeof Url = importModule("./system/application/browser/Url");
  
}

module.exports = Repository;

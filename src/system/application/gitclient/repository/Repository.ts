abstract class Repository {

  private readonly urlRoot: Url;
  private readonly repo: Types.stringful;
  private readonly secret: string;
  private readonly actions: Repository.Actions;

  constructor(
    scheme: Types.stringful,
    host: string,
    repo: Types.stringful,
    secret: string,
    actions: typeof Repository.prototype.actions
  ) {
    this.urlRoot = this.instantiateRootUrl(
      scheme,
      host
    );
    this.repo = repo;
    this.secret = secret;
    this.actions = actions;
  }

  private instantiateRootUrl(
    scheme: Types.stringful,
    host: string
  ): Url {
    return new Repository._Url(
      scheme,
      host
    );
  }

  private takeAction(
    action: Repository.Action
  ): any {
  }

  checkout(
    branch: Types.stringful
  ): any {
    return this.takeAction(Repository.Action.Checkout);
  }

  pull(): any {
    return this.takeAction(Repository.Action.Pull);
  }

  commit(
    message: Types.stringful
  ): any {
    return this.takeAction(Repository.Action.Commit);
  }

  push(): any {

  }

}

namespace Repository {

  export enum Action {
    Checkout,
    Pull,
    Commit,
    Push
  }

  export type ActionHandlerRecord = Readonly<
    Record<
      Action,
      ActionHandler
    >
  >;

  export interface Actions extends ActionHandlerRecord {
    [Action.Checkout]: CheckoutHandler;
    [Action.Pull]: PullHandler;
    [Action.Commit]: CommitHandler;
    [Action.Push]: PushHandler;
  }

  export abstract class ActionHandler {
    readonly path: string;
    readonly query: string;
    readonly params: Partial<Readonly<Record<Param, ParamConfig[]>>>;

    constructor(
      path: string,
      query: string,
      params: typeof ActionHandler.prototype.params
    ) {
      this.path = path;
      this.query = query;
      this.params = params;
    }

    createActionUrl(
      url: Url
    ): Url {
      return url;
    }
  }

  export class CheckoutHandler extends ActionHandler {
    constructor(
      path: string,
      query: string,
      params: {
        [Param.Branch]: ParamConfig[]
      }
    ) {
      super(path, query, params);
    }
  }

  export class PullHandler extends ActionHandler {
    constructor(
      path: string,
      query: string,
      params: {}
    ) {
      super(path, query, params);
    }
  }

  export class CommitHandler extends ActionHandler {
    constructor(
      path: string,
      query: string,
      params: {
        [Param.Message]: ParamConfig[],
        [Param.Limit]: ParamConfig[]
      }
    ) {
      super(path, query, params);
    }
  }

  export class PushHandler extends ActionHandler {
    constructor(
      path: string,
      query: string,
      params: {}
    ) {
      super(path, query, params);
    }
  }

  export enum Param {
    Branch,
    Repo,
    Secret,
    Message,
    Limit
  }

  export interface ParamConfig {
    param: Param,
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

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
    action: Repository.Action,
    params: Partial<Record<Repository.Param, Types.stringful>> = {}
  ): any {
    const handler = this.actions[action];
    return handler.createActionUrl(
      this.urlRoot,
      params
    )
  }

  checkout(
    branch: Types.stringful
  ): any {
    return this.takeAction(
      Repository.Action.Checkout,
      {
        [Repository.Param.Branch]: branch
      }
    );
  }

  pull(): any {
    return this.takeAction(
      Repository.Action.Pull
    );
  }

  commit(
    message: Types.stringful
  ): any {
    return this.takeAction(
      Repository.Action.Commit,
      {
        [Repository.Param.Message]: message,
        [Repository.Param.Limit]: "10000"
      }
    );
  }

  push(): any {
    return this.takeAction(
      Repository.Action.Push
    );
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
    readonly requiredParams:
      Partial<
        Readonly<
          Record<
            Param,
            ParamName
          >
        >
      >;

    constructor(
      path: string,
      query: string,
      requiredParams: typeof ActionHandler.prototype.requiredParams
    ) {
      this.path = path;
      this.query = query;
      this.requiredParams = requiredParams;
    }

    createActionUrl(
      url: Url,
      callerParams: {
        [Param.Branch]?: ParamName,
        [Param.Repo]?: ParamName,
        [Param.Secret]?: ParamName,
        [Param.Message]?: ParamName,
        [Param.Limit]?: ParamName
      }
    ): Url {
      url = new Url(url);
      url.path = this.path;
      url.query = this.query;
      Array.from(Object.entries(this.requiredParams)).forEach(
        ([param, paramName]) => {
          if (param in callerParams)
            url.addParam(
              paramName,
              callerParams[param] ?? ""
            )
          }
        }
      )

      return url;
    }
  }

  export class CheckoutHandler extends ActionHandler {
    constructor(
      path: string,
      query: string,
      params: {
        [Param.Branch]: ParamName
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
        [Param.Message]: ParamName,
        [Param.Limit]: ParamName
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

  export type ParamName = Types.stringful;

  export enum UrlPart {
    Path,
    Query
  }

  export const _Url: typeof Url = importModule("./system/application/browser/Url");

}

module.exports = Repository;

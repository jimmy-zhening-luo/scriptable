abstract class Repository {

  private readonly callback: Callback;
  private readonly paramNames:
    Record<
      Repository.Param,
      Types.stringful
    >;

  constructor(
    scheme: Types.stringful,
    host: string,
    
  ) {
    
  }

  private takeAction(
    action: Repository.Action,
    callerParams: Repository.OptionalParamValues = {}
  ): any {
    const handler: Repository.ActionHandler = this.actions[action];

    const allParams = Object.create(callerParams);
    allParams[Repository.Param.Repo] = this.repo;
    allParams[Repository.Param.Secret] = this.secret;

    return handler.createActionUrl(
      this.urlRoot,
      allParams
    );
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
      callerParams: ParamValues
    ): Url {
      const actionUrl = new Url(url);
      actionUrl.path = this.path;
      actionUrl.query = this.query;
      Array.from(Object.entries(this.requiredParams)).forEach(
        ([paramEnum, paramName]) => {
          actionUrl.addParam(
            paramName,
            callerParams[Param[paramEnum as keyof typeof Param]] ?? ""
          );
        }
      );
      return actionUrl;
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
    Repo,
    Secret,
    Branch,
    Message,
    Limit
  }

  export type ParamName = Types.stringful;
  export type ParamValue = Types.stringful;

  export type RequiredParam = Param.Repo | Param.Secret;
  export type OptionalParam = Param.Branch | Param.Message | Param.Limit;

  export type RequiredParamNames = Record<RequiredParam, ParamName>;
  export type OptionalParamNames = Partial<Record<OptionalParam, ParamName>>;
  export type ParamNames = RequiredParamNames
    & OptionalParamNames;

  export type RequiredParamValues = Record<RequiredParam, ParamValue>;
  export type OptionalParamValues = Partial<Record<OptionalParam, ParamValue>>;
  export type ParamValues = RequiredParamValues & OptionalParamValues;


  export const _Callback: typeof Callback = importModule("./system/application/browser/Callback");



module.exports = Repository;

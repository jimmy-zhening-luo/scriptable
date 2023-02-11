abstract class Repository {

  private readonly callback: Callback;
  private readonly actionHandlers: Repository.ActionHandlerRecords;

  constructor(
    scheme: Types.stringful,
    host: string
  ) {
    this.callback = new Repository._Callback(
      scheme,
      host
    );

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

  // Action type
  export enum Action {
    Checkout,
    Pull,
    Commit,
    Push
  }

  export type RequiredAction =
    | Action.Checkout
    | Action.Pull
    | Action.Commit
    | Action.Push;


  // Param type
  export enum Param {
    Repo,
    Secret,
    Branch,
    Message,
    Limit
  }

  export type RequiredParam =
    | Param.Repo
    | Param.Secret;

  export type OptionalParam =
    | Param.Branch
    | Param.Message
    | Param.Limit;


  // Param data
  //// Param key
  export type ParamKey = Types.stringful;

  export type RequiredParamKeys =
    Required<Record<
      RequiredParam,
      ParamKey
    >>;

  export type OptionalParamKeys =
    Partial<Record<
      OptionalParam,
      ParamKey
    >>;

  export type ParamKeys =
    Required<RequiredParamKeys>
    & Partial<OptionalParamKeys>;

  //// Param value
  export type ParamValue =
    | string
    | Types.stringful;

  export type RequiredParamValues =
    Required<Record<
      RequiredParam,
      ParamValue
    >>;

  export type OptionalParamValues =
    Partial<Record<
      OptionalParam,
      ParamValue
    >>;

  export type ParamValues =
    Required<RequiredParamValues>
    & Partial<OptionalParamValues>;

  //// Param key-value pair
  export type ParamKeyValuePair = [ParamKey, ParamValue];

  export type RequiredParamKeyValuePairs =
    Required<Record<
      RequiredParam,
      ParamKeyValuePair
    >>;

  export type OptionalParamKeyValuePairs =
    Partial<Record<
      OptionalParam,
      ParamKeyValuePair
    >>;

  export type ParamKeyValuePairs =
    Required<RequiredParamKeyValuePairs>
    & Partial<OptionalParamKeyValuePairs>;


  // Action Handler
  //// Action Handler records
  export type ActionHandlerRecordInterface =
    Required<Record<
      RequiredAction,
      ActionHandler
    >>;

  export interface ActionHandlerRecords extends ActionHandlerRecordInterface {
    [Action.Checkout]: CheckoutHandler;
    [Action.Pull]: PullHandler;
    [Action.Commit]: CommitHandler;
    [Action.Push]: PushHandler;
  }

  //// Action Handler type
  export interface ActionHandlerInterface {
    path: string;
    query: string;
    requiredParams: RequiredParamKeys;
    optionalParams: OptionalParamKeys;
  }

  export abstract class ActionHandler implements ActionHandlerInterface {

    readonly path: string;
    readonly query: string;
    readonly requiredParams: RequiredParamKeys;
    readonly optionalParams: OptionalParamKeys;

    constructor(
      path: string,
      query: string,
      requiredParams: typeof ActionHandler.prototype.requiredParams,
      optionalParams: typeof ActionHandler.prototype.optionalParams = {}
    ) {
      this.path = path;
      this.query = query;
      this.requiredParams = requiredParams;
      this.optionalParams = optionalParams;
    }

  }

  export class CheckoutHandler extends ActionHandler {
    constructor(
      path: string,
      query: string,
      requiredParams: RequiredParamKeys,
      optionalParams: {
        [Param.Branch]: ParamKey
      }
    ) {
      super(path, query, requiredParams, optionalParams);
    }
  }

  export class PullHandler extends ActionHandler {
    constructor(
      path: string,
      query: string,
      requiredParams: RequiredParamKeys,
      optionalParams: {}
    ) {
      super(path, query, requiredParams, optionalParams);
    }
  }

  export class CommitHandler extends ActionHandler {
    constructor(
      path: string,
      query: string,
      requiredParams: RequiredParamKeys,
      optionalParams: {
        [Param.Message]: ParamKey,
        [Param.Limit]: ParamKey
      }
    ) {
      super(path, query, requiredParams, optionalParams);
    }
  }

  export class PushHandler extends ActionHandler {
    constructor(
      path: string,
      query: string,
      requiredParams: RequiredParamKeys,
      optionalParams: {}
    ) {
      super(path, query, requiredParams, optionalParams);
    }
  }


  // External dependencies
  export const _Callback: typeof Callback = importModule("./system/application/browser/Callback");

}

module.exports = Repository;

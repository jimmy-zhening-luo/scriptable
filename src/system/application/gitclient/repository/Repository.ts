abstract class Repository {
  
  private readonly callbackBase: Callback;
  private readonly commandConfigMap: CommandConfigMap;
  secret: string;
  repo: Types.stringful;

  constructor(
    scheme: Types.stringful,
    host: string,
    commandConfigs: CommandConfigMap,
    secret: string,
    repo: Types.stringful
  ) {
    this.callbackBase = new Repository.Callback(scheme, host);
    this.commandConfigMap = commandConfigs;
    this.secret = secret;
    this.repo = repo;
  }
  
  execute(
  
  ) {
    
  }

  checkout(
    branch: Types.stringful
  ): any {
    
  }

  pull(): any {
    
  }

  commit(
    message: Types.stringful
  ): any {
    
  }

  push(): any {
    
  }
  
  get Callback(): typeof Callback {
    return Repository.Callback;
  }
  
  static get Callback(): typeof Callback {
    return importModule("./system/application/browser/Callback");
  }

}

namespace Repository {

  // Action type
  export enum Command {
    Checkout,
    Pull,
    Commit,
    Push
  }
  
  // Param type
  export enum Param {
    Repo,
    Secret,
    Branch,
    Message,
    Limit
  }

  export type StaticParam =
    | Param.Repo
    | Param.Secret;

  export type CommandParam =
    | Param.Branch
    | Param.Message
    
  // Command Config
  export interface CommandConfigInterface {
    readonly path: string,
    readonly query: string,
    readonly secretParamKey: Types.stringful,
    readonly repoParamKey: Types.stringful,
    readonly otherRequiredParamKeys?: Partial<Record<CommandParam, Types.stringful>>,
    readonly optionalParamKeys?: Partial<Record<CommandParam, Types.stringful>>
  }
  
  export abstract class CommandConfig implements CommandConfigInterface {
    
    readonly path: string;
    readonly query: string;
    readonly secretParamKey: Types.stringful;
    readonly repoParamKey: Types.stringful;
    readonly otherRequiredParamKeys?: Partial<Record<CommandParam, Types.stringful>>;
    readonly optionalParamKeys?: Partial<Record<CommandParam, Types.stringful>>;
    
    constructor(
     path: string,
     query: string,
     secretParamKey: Types.stringful,
     repoParamKey: Types.stringful,
     otherRequiredParamKeys: Partial<Record<CommandParam, Types.stringful>> = {}
     optionalParamKeys:  Partial<Record<CommandParam, Types.stringful>> = {}
    ) {
      this.path = path;
      this.query = query;
      // finish later
    }
  }

  export class CheckoutHandler extends CommandHandler {
    constructor(
      path: string,
      query: string,
      secretParamKey: Types.stringful,
      repoParamKey: Types.stringful,
      otherRequiredParamKeys: {
        [Param.Branch]: Types.stringful
      }
    ) {
      super(path, query, secretParamKey, repoParamKey, otherRequiredParamKeys);
    }
  }

  export class PullHandler extends CommandHandler {
    constructor(
      path: string,
      query: string,
      secretParamKey: Types.stringful,
      repoParamKey: Types.stringful
    ) {
      super(path, query, secretParamKey, repoParamKey);
    }
  }

  export class CommitHandler extends CommandHandler {
    constructor(
      path: string,
      query: string,
      secretParamKey: Types.stringful,
      repoParamKey: Types.stringful,
      otherRequiredParamKeys: {
        [Param.Message]: Types.stringful
      }
    ) {
      super(path, query, secretParamKey, repoParamKey, otherRequiredParamKeys);
    }
  }

  export class PushHandler extends CommandHandler {
    constructor(
      path: string,
      query: string,
      secretParamKey: Types.stringful,
      repoParamKey: Types.stringful
    ) {
      super(path, query, secretParamKey, repoParamKey);
    }
  }
  
  export type CommandConfigMapType = Required<Record<Command, CommandConfig>>;
  
  export interface CommandConfigMap extends CommandConfigMapType {
    [Command.Checkout]: CheckoutHandler,
    [Command.Pull]: PullHandler,
    [Command.Commit]: CommitHandler,
    [Command.Push]: PushHandler
  }

}

module.exports = Repository;

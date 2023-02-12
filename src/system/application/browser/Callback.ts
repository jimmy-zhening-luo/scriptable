class Callback {

  private readonly _rootUrl: Url;
  private _staticParams: Query;
  private _actions:
    Map<
      Callback.ActionId,
      Callback.ActionConfig
    >;

  constructor(
    scheme: Types.stringful | Scheme,
    host: string | Host,
    staticParams:
      | string
      | Query
      | Callback.ParamMap
      | Callback.ParamRecord
      | Callback.ParamTuple
      | Callback.ParamTuples = "",
    actions: {
      [key: Callback.ActionId]: Callback.ActionConfig
    } = {}
  ) {
    this._rootUrl = new Callback.Url(
      scheme,
      host
    );
    this._staticParams = new Callback
      .Query(
        staticParams
      );
    this._actions = new Map(
      Object.entries(
        actions
      )
    );
  }

  get rootUrl(): Types.stringful {
    return this._rootUrl.toString();
  }

  get scheme(): Types.stringful {
    return this._rootUrl.scheme;
  }

  set scheme(
    scheme:
      | Types.stringful
      | Scheme
  ) {
    this._rootUrl.scheme = scheme;
  }

  get host(): string {
    return this._rootUrl.host;
  }

  set host(
    host:
      | string
      | Host
  ) {
    this._rootUrl.host = host;
  }

  get staticParams(): Callback.ParamMap {
    return this.staticParamMap;
  }

  get staticParamQueryString(): string {
    return this._staticParams.toString();
  }

  get staticParamEntries(): Callback.ParamTuples {
    return this._staticParams.toTuples();
  }

  get staticParamMap(): Callback.ParamMap {
    return this._staticParams.toMap();
  }

  set staticParams(
    params:
      | string
      | Query
      | Callback.ParamMap
      | Callback.ParamRecord
      | Callback.ParamTuple
      | Callback.ParamTuples
  ) {
    this._staticParams = new Callback.Query(params);
  }

  addStaticParam(
    ...params: Parameters<Query["addParam"]>
  ): this {
    this._staticParams = this._staticParams.addParam(
      ...params
    );
    return this;
  }

  deleteStaticParam(
    ...keys: Parameters<Query["deleteParam"]>
  ): this {
    this._staticParams = this._staticParams.deleteParam(
      ...keys
    );
    return this;
  }

  request(
    path: string | Path,
    query:
      | string
      | Query
      | Record<string, string>
      | [string, string]
      | [string, string][],
    attachStaticParams: boolean = true,
    overrideStaticParams: boolean = true
  ): any {
    const cUrl: Url = new Callback.Url(this._rootUrl);
    cUrl.path = path;
    if (attachStaticParams) {
      if (overrideStaticParams) {
        cUrl.query = this._staticParams;
        cUrl.addParam(query);
      }
      else {
        cUrl.query = query;
        cUrl.addParam(this._staticParams);
      }
    }
    else
      cUrl.query = query;
    return cUrl.xCallback;
  }

  requestAction(
    actionId: Callback.ActionId,
    requestParams:
      | string
      | Query
      | Map<
          Callback.ParamKey,
          Callback.ParamValue
        >
      | {
          [key: Callback.ParamKey]: Callback.ParamValue
        }
      | Callback.ParamTuple
      | Callback.ParamTuples = ""
  ): any {
    if (this._actions.has(actionId)) {
      const action: Callback.ActionConfig = this._actions[actionId];

      const actionUrl: Url = new Callback.Url(this._rootUrl);
      actionUrl.appendPath(
        action.path
      );
      actionUrl.query = action.query;

      const requestParams: Query = new Callback
        .Query(
          staticParams
        );

      action.requiredParams.forEach(
        (key) => {
          if (this._staticParams.hasParam(key))
            actionUrl.addParam(
              key,
              this._staticParams.getParam(
                key
              )
            );
          if (requestParams.hasParam(key))
            actionUrl.addParam(
              key,
              requestParams(key)
            );
        }
      );

      action.optionalParams.forEach(
        (key) => {
          if (requestParams.hasParam(key))
            actionUrl.addParam(
              key,
              requestParams(key)
            );
        }
      );

      if (action
        .requiredParams
        .every((key) => actionUrl
          .hasParam(key)
        )
      )
        return actionUrl.xCallback();
      else
        return {};
    }
    else
      return {};
  }

  get Url(): typeof Url {
    return Callback.Url;
  }

  get Query(): typeof Query {
    return Callback.Query;
  }

  static get Url(): typeof Url {
    return importModule("Url");
  }

  static get Query(): typeof Query {
    return Callback.Url.Query;
  }

}

namespace Callback {

  export type ActionId = Types.stringful;

  export interface ActionConfig {
    path: string,
    queryRoot: string,
    requiredParams?: ParamKey[],
    optionalParams?: ParamKey[]
  }

  export type ParamKey = Types.stringful;
  export type ParamValue = string;

  export type ParamTuple = [ParamKey, ParamValue];

  export type ParamTuples = ParamTuple[];

  export type ParamMap = Map<ParamKey, ParamValue>;

  export type ParamRecord = Record<ParamKey, ParamValue>;

}

module.exports = Callback;

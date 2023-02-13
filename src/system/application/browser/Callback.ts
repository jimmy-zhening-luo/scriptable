class Callback {

  private readonly _baseUrl: Url;

  constructor(
    scheme: Types.stringful | Scheme,
    host: string | Host = "",
    basePath: string | Path = "",
    commonParams:
      | string
      | Query
      | Callback.ParamMap
      | Callback.ParamRecord
      | Callback.ParamTuple
      | Callback.ParamTuples = ""
  ) {
    this._baseUrl = new Callback.Url(
      scheme,
      host,
      undefined,
      basePath,
      new Callback.Query(
        commonParams
      )
    );
  }

  get urlBase(): Types.stringful {
    return this._baseUrl.toString();
  }

  get scheme(): Types.stringful {
    return this._baseUrl.scheme;
  }

  set scheme(
    scheme:
      | Types.stringful
      | Scheme
  ) {
    this._baseUrl.scheme = scheme;
  }

  get host(): string {
    return this._baseUrl.host;
  }

  set host(
    host:
      | string
      | Host
  ) {
    this._baseUrl.host = host;
  }

  get basePath(): string {
    return this._baseUrl.path;
  }

  set basePath(
    path:
      | string
      | Path
  ) {
    this._baseUrl.path = path;
  }

  appendBasePath(
    ...path: Parameters<Url["appendPath"]>
  ): this {
    this._baseUrl.appendPath(...path);
    return this;
  }

  get commonParams(): Callback.ParamMap {
    return this.commonParamMap;
  }

  get commonQuery(): string {
    return this._baseUrl.query;
  }

  get commonParamTuples(): Callback.ParamTuples {
    return this._baseUrl.queryTuples;
  }

  get commonParamMap(): Callback.ParamMap {
    return this._baseUrl.queryMap;
  }

  set commonParams(
    params:
      | string
      | Query
      | Callback.ParamMap
      | Callback.ParamRecord
      | Callback.ParamTuple
      | Callback.ParamTuples
  ) {
    this._baseUrl.query = new Callback.Query(params);
  }

  addCommonParam(
    ...params: Parameters<Query["addParam"]>
  ): this {
    this._baseUrl.addParam(
      ...params
    );
    return this;
  }

  deleteCommonParam(
    ...keys: Parameters<Query["deleteParam"]>
  ): this {
    this._baseUrl.deleteParam(
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
    attachCommonParams: boolean = true,
    overrideCommonParams: boolean = true
  ): any {
    const cUrl: Url = new Callback.Url(this._baseUrl);
    cUrl.appendPath(path);
    if (attachCommonParams) {
      if (overrideCommonParams)
        cUrl.addParam(query);
      else {
        const commonQuery: string = cUrl.query;
        cUrl.query = query;
        cUrl.addParam(commonQuery);
      }
    }
    else {
      cUrl.query = "";
      cUrl.query = query;
    }
    return cUrl.xCallback;
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

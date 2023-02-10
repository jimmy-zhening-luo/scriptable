class Api {

  private _url: Url;
  method: Api.Method;
  private _request: ApiRequest;

  constructor(
    url:
      | string
      | Url
      | Url.UrlParts,
    method: Api.Method = Api.Method.GET,
    authHeader?:
      | string
      | [string, string]
      | {
        authType: string,
        authToken: string
      },
    headers?:
      | [string, Types.primitive]
      | [string, Types.primitive][]
      | { [key: string]: Types.primitive },
    body?:
      | string
      | RequestBody.RequestBodyInterface,
    timeoutSeconds?: number
  ) {
    this._url = new Url(url);
    this.method = method;
    this._request = new Api._ApiRequest(
      this._url.toString(),
      this.method.toString(),
      authHeader,
      headers,
      body,
      timeoutSeconds
    );
  }

  request(): any {
    return ""
  }

  requestObject(): any {
    return ""
  }

  requestStringObject(): any {
    return ""
  }

  requestString(): string {
    return ""
  }

  get url(): string {
    return this._url.toString();
  }

  set url(url:
    | string
    | Url
    | Url.UrlParts
  ) {
    this._url = new Url(url);
  }

  get scheme(): string {
    return this._url.scheme;
  }

  set scheme(scheme: string | Scheme) {
    this._url.scheme = scheme;
  }

  get host(): string {
    return this._url.host;
  }

  set host(host: string | Host) {
    this._url.host = host;
  }

  get port(): string {
    return this._url.port;
  }

  set port(port: string | number | Port) {
    this._url.port = port;
  }

  get path(): string {
    return this._url.path;
  }

  set path(path: string | Path) {
    this._url.path = path;
  }

  get query(): string {
    return this._url.query;
  }

  set query(query: string | Query) {
    this._url.query = query;
  }

  addParam(
    keyOrKeyValue:
      string
      | [string, string],
    value?: string
  ): void {
    this._url.addParam(
      keyOrKeyValue,
      value
    );
  }

  deleteParam(key: string): void {
    this.addParam(key, "")
  }

  get fragment(): string {
    return this._url.fragment;
  }

  set fragment(scheme: string | Scheme) {
    this._url.scheme = scheme;
  }

}

namespace Api {

  export enum Method {
    GET,
    POST,
    PUT
  }

  export const _Url: typeof Url = importModule("Url");

  export const _ApiRequest: typeof ApiRequest = importModule("apihandlers/ApiRequest");

  export const _ApiResponse: typeof ApiResponse = importModule("apihandlers/ApiResponse");

}

module.exports = Api;

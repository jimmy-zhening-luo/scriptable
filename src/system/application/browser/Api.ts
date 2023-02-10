class Api {

  private _url: Url;
  private _request: ApiRequest;

  constructor(
    url:
      | string
      | Url
      | Url.UrlParts,
    method: ApiRequest.Method = Api.Method.GET,
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
    this._request = new Api._ApiRequest(
      this._url.toString(),
      method,
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
    return this._request.url;
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

  get method(): ApiRequest.Method {
    return this._request.method;
  }

  set method(method: ApiRequest.Method) {
    this._request.method = method;
  }

}

namespace Api {

  export const Method: typeof ApiRequest.Method = ApiRequest.Method;

  export const _Url: typeof Url = importModule("Url");

  export const _ApiRequest: typeof ApiRequest = importModule("apihandlers/ApiRequest");

  export const _ApiResponse: typeof ApiResponse = importModule("apihandlers/ApiResponse");

}

module.exports = Api;

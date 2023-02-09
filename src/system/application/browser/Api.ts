class Api {

  private _url: Url;
  private readonly _httpMethod: HttpMethod;

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
    this._httpMethod = new Api.Methods[method](
      this._url.toString(),
      method.toString(),
      authHeader,
      headers,
      body,
      timeoutSeconds
    );
  }

  request(): ApiResponse {
    return this._httpMethod.request();
  }

  requestJson(): any {
    return this.request().toObject();
  }

  requestString(): string {
    return this.request().toString();
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

  toString(): string {
    return this.httpMethod.toString();
  }
}

namespace Api {

  export const _Url: typeof Url = importModule("Url");

  export const _ApiRequest: typeof ApiRequest = importModule("apimethods/apirequest/ApiRequest");

  export const _ApiResponse: typeof ApiResponse = importModule("apimethods/apiresponse/ApiResponse");

  export enum Method {
    GET,
    POST
  }

  export const Methods: HttpMethods<typeof Method, typeof HttpGet | typeof HttpPost> = {
    GET: importModule("apimethods/HttpGet") as typeof HttpGet,
    POST: importModule("apimethods/HttpPost") as typeof HttpPost
  };

  export type HttpMethods<E, M> = {
    [Property in keyof E]: M extends HttpMethod ? M : typeof HttpGet
  }
}

module.exports = Api;

class Api {
  readonly httpMethod: HttpMethod;

  constructor(
    url:
      | string
      | Url
      | Url.UrlParts,
    headers?:
      | [string, string | number | boolean]
      | [string, string | number | boolean][]
      | RequestHeader
      | RequestHeader[]
      | RequestHeaders
      | { [key: string]: string | number | boolean },
    body?:
      | string
      | Api.RequestBodyObject,
    method?: Api.Method = Api.Method.GET,
    timeoutSeconds?: number = 30
  ) {
    this.httpMethod = new (Api.Methods[Api.Method.GET])(
      this.url,
      new ApiRequest(headers, body),
      timeoutSeconds
    );
  }

  request(): ApiResponse {
    return new Api._ApiResponse();
  }

  get #url(): Url {
    return this.httpMethod.url;
  }

  set #url(url: Url) {
    this.httpMethod.url = url;
  }

  get url(): string {
    return this.#url.toString();
  }

  set url(url:
    | string
    | Url
    | Url.UrlParts
  ) {
    this.#url = new Url(url);
  }

  get scheme(): string {
    return this.#url.scheme;
  }

  set scheme(scheme: string | Scheme) {
    this.#url.scheme = scheme;
  }

  get host(): string {
    return this.#url.host;
  }

  set host(host: string | Host) {
    this.#url.host = host;
  }

  get port(): string {
    return this.#url.port;
  }

  set port(port: string | number | Port) {
    this.#url.port = port;
  }

  get path(): string {
    return this.#url.path;
  }

  set path(path: string | Path) {
    this.#url.path = path;
  }

  get query(): string {
    return this.#url.query;
  }

  set query(query: string | Query) {
    this.#url.query = query;
  }

  addParam(
    keyOrKeyValue:
      string
      | [string, string],
    value?: string
  ): void {
    this.#url.addParam(
      keyOrKeyValue,
      value
    );
  }

  deleteParam(key: string): void {
    this.addParam(key, "")
  }

  get fragment(): string {
    return this.#url.fragment;
  }

  set fragment(scheme: string | Scheme) {
    this.#url.scheme = scheme;
  }

  toString(): string {
    // TBD
    return "";
  }
}

namespace Api {
  export interface RequestBodyObject {
    [key: string]: (
      | string
      | number
      | boolean
      | RequestBodyObject
      | RequestBodyObject[]
    )
  }

  export const _Url: typeof Url = importModule("Url");

  export const _ApiRequest: typeof ApiRequest = importModule("apimethods/apirequest/ApiRequest");

  export const _ApiResponse: typeof ApiResponse = importModule("apimethods/apiresponse/ApiResponse");

  export enum Method {
    GET,
    POST
  }

  export const Methods: HttpMethods<typeof Method> = {
    GET: importModule("apimethods/HttpGet"),
    POST: importModule("apimethods/HttpPost")
  };

  type HttpMethods<Type> = {
    [Property in keyof Type]: typeof HttpMethod
  }
}

module.exports = Api;

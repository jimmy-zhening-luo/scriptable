class Api {
  #url: Url = new Api._Url();
  #request: ApiRequest = new Api._ApiRequest();

  constructor(
    url: string | Url | Url.UrlParts,
    method?:
      | keyof typeof Api.Method
      | HttpMethod,
    headers?:
      | [string, string | number | boolean]
      | [string, string | number | boolean][]
      | RequestHeader
      | RequestHeader[]
      | RequestHeaders
      | { [key: string]: string | number | boolean },
    body?:
      | string
  ) {
    this.url = new Api._Url(url);
  }

  get url(): string {
    return this.#url.toString();
  }

  set url(url: string | Url) {
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
  export enum Method {
    GET,
    POST
  }

  export const _Url: typeof Url = importModule("Url");

  export const _ApiRequest: typeof ApiRequest = importModule("http/apirequest/ApiRequest");

  export const _ApiResponse: typeof ApiResponse = importModule("http/apiresponse/ApiResponse");

  export const methods: HttpMethods = {
    GET: importModule("http/HttpGet"),
    POST: importModule("http/HttpPost")
  };

  export interface HttpMethods {
    GET: typeof HttpMethod
    POST: typeof HttpMethod
  }
}

module.exports = Api;

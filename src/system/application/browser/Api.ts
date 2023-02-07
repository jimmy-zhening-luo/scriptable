class Api {
  #url: Url = new Api._Url();
  request: ApiRequest = new Api._ApiRequest();
  
  constructor(
    url: string | Url,
    method?: keyof typeof Api.Method | HttpMethod
    {
      headerAuth,
      headers,
      body
    }
  ) {
    this.url = 
  }
  
  get url(): string {
    return this.#url.toString();
  }
  
  set url(url: string | Url) {
    this.#url = new Url(url);
  }
  
  get httpRequest(): string {
    return [
      [
        
      ].join(" ")
    ].join("\n");
  }
  
  toString(): string {
    return this.httpRequest;
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
    [key: keyof typeof Method]: typeof HttpMethod
  }
}

module.exports = Api;

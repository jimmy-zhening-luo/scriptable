class RequestHeaders {

  private _authHeader?: null | AuthRequestHeader;
  private _headers?: null | RequestHeader[];

  constructor(
    authType?: string,
    authToken?: string,
    headers?: RequestHeaders.RequestHeadersInput
  );
  constructor(
    authTypeToken?: string,
    headers?: RequestHeaders.RequestHeadersInput
  );
  constructor(headers?: RequestHeaders.RequestHeadersInput);

  constructor(
    authTypeOrHeaders?:
      | string
      | RequestHeaders.RequestHeadersInput,
    authTokenOrHeaders?:
      | string
      | RequestHeaders.RequestHeadersInput,
    headers?:
      | RequestHeaders.RequestHeadersInput
  ) {
    if (typeof authTypeOrHeaders === "string") {
      if (typeof authTokenOrHeaders === "string") {
        this._authHeader = new RequestHeaders._AuthRequestHeader(authTypeOrHeaders, authTokenOrHeaders);
        this.add(headers);
      }
      else {
        this._authHeader = new RequestHeaders._AuthRequestHeader(authTypeOrHeaders);
        this.add(authTokenOrHeaders);
      }
    }
    else
      this.add(authTypeOrHeaders);
  }

  get auth(): string {
    return this._authHeader?.toString() ?? "";
  }

  get authTuple(): string {
    return
  }

  setAuth(
    authType?: string,
    token?: string
  ): this {
    if (authType === undefined && token === undefined)
      this._authHeader = null;
    else if (authType === undefined && token !== undefined)
      this._authHeader = new RequestHeaders._AuthRequestHeader(token);
    else if (authType !== undefined && token === undefined)
      this._authHeader = new RequestHeaders._AuthRequestHeader(authType);
    else if (authType !== undefined && token !== undefined)
      this._authHeader = new RequestHeaders._AuthRequestHeader(authType, token);
    return this;
  }

  add(
    headers?: RequestHeaders.RequestHeadersInput
  ): this {
    if (this._headers === undefined || this._headers === null)
      this._headers = [];

    if (headers === undefined)
      this._headers = null;
    else if (Array.isArray(headers)) {
      if (headers.length === 0)
        this._headers = null;
      else
        for (const header of headers) {
          if (typeof header === "string")
            this._headers.push(new RequestHeaders._GenericRequestHeader(header));
          else if (Array.isArray(header))
            this._headers.push(new RequestHeaders._GenericRequestHeader(header[0], header[1]));
        }
    }

    else
      for (const key in headers)
        if (headers.hasOwnProperty(key)) {
          const value = headers[key];
          this._headers.push(new RequestHeaders._GenericRequestHeader(key, value));
        }

    return this;
  }
}

namespace RequestHeaders {

  export type RequestHeadersInput =
    | [string, Types.primitive?]
    | [string, Types.primitive?][]
    | { [key: string]: Types.primitive };


  export const _AuthRequestHeader: typeof AuthRequestHeader = importModule("requestheaders/AuthRequestHeader");

  export const _GenericRequestHeader: typeof GenericRequestHeader = importModule("requestheaders/GenericRequestHeader");

}

module.exports = RequestHeaders;

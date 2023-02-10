class RequestHeaders {

  private readonly _headers: {
    Authorization?: AuthRequestHeader
    [key: Types.stringful]: RequestHeader<Types.primitive>
  };

  constructor();
  constructor(
    auth: string,
    headers?: RequestHeaders.Input
  );
  constructor(
    authType: string,
    authToken: string,
    headers?: RequestHeaders.Input
  );
  constructor(headers?: RequestHeaders.Input);

  constructor(
    authOrAuthTypeOrHeaders?:
      | string
      | RequestHeaders.Input,
    authTokenOrHeaders?:
      | string
      | RequestHeaders.Input,
    headers?:
      | RequestHeaders.Input
  ) {
    this._headers = {};
    if (authOrAuthTypeOrHeaders === undefined) { }
    else if (typeof authOrAuthTypeOrHeaders !== "string")
      this.add(authOrAuthTypeOrHeaders);
    else {
      if (authTokenOrHeaders === undefined || typeof authTokenOrHeaders !== "string")
        this.auth = authOrAuthTypeOrHeaders;
      else
        this.setAuthTypeAndToken(authOrAuthTypeOrHeaders, authTokenOrHeaders);

      if (authTokenOrHeaders === undefined) { }
      else if (typeof authTokenOrHeaders === "string") {
        if (headers !== undefined)
          this.add(headers);
      }
      else
        this.add(authTokenOrHeaders);
    }
  }

  get auth(): string {
    return "Authorization" in this._headers ?
      this._headers.Authorization.auth
      : "";
  }

  set auth(
    authString: string
  ) {
    authString === "" ?
      delete this._headers.Authorization
      : this._headers.Authorization = new RequestHeaders._AuthRequestHeader(authString);
  }

  get keys(): Types.stringful[] {
    return Object.keys(this._headers);
  }

  get headers(): Record<Types.stringful, Types.primitive> {
    return this.keys
      .reduce(
        (obj, key) => {
          obj[key] = this._headers[key].value;
          return obj;
        },
        {} as typeof RequestHeaders.prototype.headers
      );
  }

  setAuthTypeAndToken(
    authType: string,
    token: string
  ): this {
    this.auth = [authType, token].join(" ");
    return this;
  }

  deleteAuth(): this {
    this.auth = "";
    return this;
  }

  set(
    key: Types.stringful,
    value: Types.primitive
  ): this {
    this._headers[key] = new RequestHeaders._GenericRequestHeader(key, value);
    return this;
  }

  delete(
    key: Types.stringful
  ): this {
    delete this._headers[key];
    return this;
  }

  add(
    headers: RequestHeaders.Input
  ): this {
    if (!Array.isArray(headers))
      Object.keys(headers)
        .forEach(key => this.set(
          key,
          headers[key]
        ));
    else {
      if (headers.length === 0) { }
      else if (typeof headers[0] === "string") {
        this.set(headers[0], headers[1] as Types.primitive);
      }
      else {
        (headers as [string, Types.primitive][]).forEach(header => {
          this.set(
            header[0],
            header[1]
          );
        });
      }
    }
    return this;
  }

  toObject(): typeof RequestHeaders.prototype.headers {
    return this.headers;
  }

  toStringObject(): Record<Types.stringful, string> {
    return this.keys
      .reduce(
        (obj, key) => {
          obj[key] = this._headers[key].stringValue;
          return obj;
        },
        {} as ReturnType<RequestHeaders["toStringObject"]>
    );
  }

  toString(): string {
    return Object.keys(
      this.headers
    )
      .map(
        key => this
          .headers[key]
          .toString()
      )
      .join("\r\n");
  }

}

namespace RequestHeaders {

  export type Input =
    | [Types.stringful, Types.primitive]
    | [Types.stringful, Types.primitive][]
    | Record<Types.stringful, Types.primitive>;

  export const _AuthRequestHeader: typeof AuthRequestHeader = importModule("requestheaders/AuthRequestHeader");

  export const _GenericRequestHeader: typeof GenericRequestHeader = importModule("requestheaders/GenericRequestHeader");

}

module.exports = RequestHeaders;

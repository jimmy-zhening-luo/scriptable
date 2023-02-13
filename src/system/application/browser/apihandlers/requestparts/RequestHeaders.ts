class RequestHeaders {

  private readonly _headers: RequestHeaders.RequestHeaderRecord;

  constructor(
    authOrHeaders?:
      | string
      | AuthRequestHeader
      | Parameters<RequestHeaders["addHeaders"]>[0],
    authTokenOrHeaders?:
      | string
      | Parameters<RequestHeaders["addHeaders"]>[0],
    headers?:
      | Parameters<RequestHeaders["addHeaders"]>[0]
  ) {
    this._headers = {};
    if (authStringOrAuthTypeOrHeaders === undefined) { }
    else if (typeof authStringOrAuthTypeOrHeaders !== "string")
      this.addHeaders(
        authStringOrAuthTypeOrHeaders
      );
    else {
      if (
        authTokenOrHeaders === undefined
        || typeof authTokenOrHeaders !== "string"
      )
        this.auth = authStringOrAuthTypeOrHeaders;
      else
        this.setAuthTypeAndToken(
          authStringOrAuthTypeOrHeaders,
          authTokenOrHeaders
        );

      if (authTokenOrHeaders === undefined) { }
      else if (typeof authTokenOrHeaders === "string") {
        if (headers !== undefined)
          this.addHeaders(
            headers
          );
      }
      else
        this.addHeaders(
          authTokenOrHeaders
        );
    }
    for (const key in this._headers)
      if (this._headers[key].value === "")
        delete this._headers[key];
  }

  get auth(): typeof AuthRequestHeader.prototype.auth {
    return "Authorization" in this._headers ?
      this._headers.Authorization.authString
      : "";
  }

  set auth(
    auth: ConstructorParameters<typeof AuthRequestHeader>[0]
  ) {
    this._headers.Authorization = new this.AuthRequestHeader(
      auth
    );
    if (this._headers.Authorization.auth === "")
      delete this._headers.Authorization;
  }

  hasAuth(): boolean {
    return this.headers.has("Authorization");
  }

  setAuthTypeAndToken(
    authType: string,
    authToken: string
  ): this {
    this.auth = [
      authType,
      authToken
    ]
      .join(" ");
    return this;
  }

  deleteAuth(): this {
    this.auth = "";
    return this;
  }


  get keys(): Types.stringful[] {
    return Array.from(
      this.headers.keys()
    );
  }

  get headers(): Map<Types.stringful, Types.primitive> {
    return new Map(
      Array.from(
        Object.entries(
          this._headers
        )
      ).map(
        ([key, value]) => [key, value.value]
      )
    );
  }

  get stringHeaders(): Map<Types.stringful, string> {
    return new Map(
      Array.from(
        this.headers
      ).map(
        ([key, value]) => [key, value.toString()]
      )
    );
  }

  hasHeader(
    headerKey: Types.stringful
  ): boolean {
    return this.headers.has(headerKey);
  }

  getHeader(
    headerKey: Types.stringful
  ): string {
    return headerKey in this._headers ?
      this._headers[headerKey].header
      : "";
  }

  getHeaderValue(
    headerKey: Types.stringful
  ): Types.primitive {
    return headerKey in this._headers ?
      this._headers[headerKey].value
      : "";
  }

  getHeaderValueString(
    headerKey: Types.stringful
  ): string {
    return headerKey in this._headers ?
      this._headers[headerKey].stringValue
      : "";
  }

  setHeader(
    headerKey: Types.stringful,
    headerValue: Types.primitive
  ): this {
    this._headers[
      headerKey
    ] = new this.GenericRequestHeader(
      headerKey, headerValue
    );
    return this;
  }

  deleteHeader(
    key: Types.stringful
  ): this {
    delete this._headers[
      key
    ];
    return this;
  }

  addHeaders(
    headers:
      | [Types.stringful, Types.primitive]
      | [Types.stringful, Types.primitive][]
      | Record<Types.stringful, Types.primitive>
      | Map<Types.stringful, Types.primitive>
  ): this {
    if (!Array.isArray(headers))
      Object.keys(headers)
        .forEach(key => this.setHeader(
          key,
          headers[key]
        ));
    else {
      if (headers.length === 0) { }
      else if (typeof headers[0] === "string") {
        this.setHeader(headers[0], headers[1] as Types.primitive);
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

  toMap(): typeof RequestHeaders.prototype.headers {
    return this.headers;
  }

  toStringMap(): typeof RequestHeaders.prototype.stringHeaders {
    return this.stringHeaders;
  }

  toString(): string {
    return Array.from(
      this.stringHeaders
    ).map(
      ([key, value]) => [key, value]
        .join(": ")
    )
      .join("\r\n");
  }

  get RequestHeaderTypes(): typeof RequestHeaderTypes {
    return RequestHeaders.RequestHeaderTypes;
  }

  get AuthRequestHeader(): typeof AuthRequestHeader {
    return RequestHeaders.AuthRequestHeader;
  }

  get GenericRequestHeader(): typeof GenericRequestHeader {
    return RequestHeaders.GenericRequestHeader;
  }

  static get RequestHeaderTypes(): typeof RequestHeaderTypes {
    return importModule("requestheadertypes/RequestHeaderTypes");
  }

  static get AuthRequestHeader(): typeof AuthRequestHeader {
    return RequestHeaders.RequestHeaderTypes.AuthRequestHeader;
  }

  static get GenericRequestHeader(): typeof GenericRequestHeader {
    return RequestHeaders.RequestHeaderTypes.GenericRequestHeader;
  }

}

namespace RequestHeaders {

  export type RequestHeaderRecordProto =
    Record<
      Types.stringful,
      RequestHeader<Types.primitive>
    >;

  export interface RequestHeaderRecord extends RequestHeaderRecordProto {
    Authorization?: AuthRequestHeader,
    [key: Types.stringful]: GenericRequestHeader<Types.primitive>
  }

}


module.exports = RequestHeaders;

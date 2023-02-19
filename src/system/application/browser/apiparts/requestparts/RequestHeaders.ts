class RequestHeaders {

  private readonly _headers: RequestHeaders.RequestHeaderRecord;

  constructor(
    authOrAuthScheme?:
      | ConstructorParameters<typeof AuthRequestHeader>[0]
      | Parameters<RequestHeaders["addHeaders"]>[0],
    authToken?:
      | ConstructorParameters<typeof AuthRequestHeader>[1]
      | Parameters<RequestHeaders["addHeaders"]>[0],
    ...headers: Parameters<RequestHeaders["addHeaders"]>
  ) {
    this._headers = {};

    if (
      authOrAuthScheme === undefined
      || authOrAuthScheme === null
    ) { }

    else if (typeof authOrAuthScheme === "string") {
      if (
        authToken === undefined
        || authToken === null
      ) {
        const authString: string = authOrAuthScheme;
        this.auth = authString;
      }
      else if (typeof authToken === "string") {
        const authType: string = authOrAuthScheme;
        this.setAuthTypeAndToken(
          authType,
          authToken
        );
        this.addHeaders(
          ...headers
        );
      }
      else {
        const authString: string = authOrAuthScheme;
        this.auth = authString;
        this.addHeaders(
          authToken,
          ...headers
        );
      }
    }

    else if (Symbol.iterator in authOrAuthScheme) {
      if (
        authToken === undefined
        || authToken === null
        || typeof authToken === "string"
      ) {
        const header0: Parameters<RequestHeaders["addHeaders"]>[0] = authOrAuthScheme;
        this.addHeaders(
          header0,
          ...headers
        );
      }
      else {
        const header0: Parameters<RequestHeaders["addHeaders"]>[0] = authOrAuthScheme;
        const header1: Parameters<RequestHeaders["addHeaders"]>[0] = authToken;
        this.addHeaders(header0, header1, ...headers);
      }
    }

    else if (
      authOrAuthScheme instanceof this.AuthRequestHeader
      || Reflect
        .ownKeys(
          new this.AuthRequestHeader()
        ).every(
          key => key in authOrAuthScheme
      )
      || Object.getPrototypeOf(authOrAuthScheme) === this.AuthRequestHeader.prototype
    ) {
      this.auth = authOrAuthScheme as AuthRequestHeader;
    }
    else {
      if (
        authToken === undefined
        || authToken === null
        || typeof authToken === "string"
      ) {
        const header0: Parameters<RequestHeaders["addHeaders"]>[0] = authOrAuthScheme;
        this.addHeaders(
          header0,
          ...headers
        );
      }
      else {
        const header0: Parameters<RequestHeaders["addHeaders"]>[0] = authOrAuthScheme;
        const header1: Parameters<RequestHeaders["addHeaders"]>[0] = authToken;
        this.addHeaders(
          header0,
          header1,
          ...headers
        );
      }
    }
    this.clearEmptyParameters();
  }

  protected clearEmptyParameters(): void {
    for (const key in this._headers)
      if (
        key === ""
        || this._headers[key].value === ""
      )
        delete this._headers[key];
  }

  get auth(): typeof AuthRequestHeader.prototype.auth {
    return "Authorization" in this._headers ?
      this._headers.Authorization.auth
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


  get keys(): string[] {
    return Array.from(
      this.headers.keys()
    );
  }

  get headers(): Map<string, string | number | boolean> {
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

  get stringHeaders(): Map<string, string> {
    return new Map(
      Array.from(
        this.headers
      ).map(
        ([key, value]) => [key, value.toString()]
      )
    );
  }

  hasHeader(
    headerKey: string
  ): boolean {
    return this.headers.has(headerKey);
  }

  getHeader(
    headerKey: string
  ): string {
    return headerKey in this._headers ?
      this._headers[headerKey].header
      : "";
  }

  getHeaderValue(
    headerKey: string
  ): string | number | boolean {
    return headerKey in this._headers ?
      this._headers[headerKey].value
      : "";
  }

  getHeaderValueString(
    headerKey: string
  ): string {
    return headerKey in this._headers ?
      this._headers[headerKey].stringValue
      : "";
  }

  setHeader(
    headerKey: string,
    headerValue: string | number | boolean
  ): this {
    headerValue.toString() === "" ?
      this.deleteHeader(headerKey)
      : this._headers[headerKey] = new this.GenericRequestHeader(
        headerKey, headerValue
      );
    return this;
  }

  deleteHeader(
    key: string
  ): this {
    delete this._headers[
      key
    ];
    return this;
  }

  addHeaders(
    ...headers: Array<
      | [string, string | number | boolean]
      | [string, string | number | boolean][]
      | Record<string, string | number | boolean>
      | Map<string, string | number | boolean>
    >
  ): this {
    for (const header of headers) {
      if (header instanceof Map) {
        for (const [key, value] of header)
          this.setHeader(key, value);
      }
      else if (!(Symbol.iterator in header)) {
        for (const [key, value] of Array.from(Object.entries(header)))
          this.setHeader(key, value);
      }
      else if (Array.isArray([header][0])
      ) {
        for (const [key, value] of header as [string, string | number | boolean][])
          this.setHeader(key, value);
      }
      else {
        this.setHeader(header[0] as string, header[1] as string | number | boolean);
      }
    }
    this.clearEmptyParameters();
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
      string,
      RequestHeader<string | number | boolean>
    >;

  export interface RequestHeaderRecord extends RequestHeaderRecordProto {
    Authorization?: AuthRequestHeader,
    [key: string]: GenericRequestHeader<string | number | boolean>
  }

}


module.exports = RequestHeaders;

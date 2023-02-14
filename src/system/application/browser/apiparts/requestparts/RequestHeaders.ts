class RequestHeaders {

  private readonly _headers: RequestHeaders.RequestHeaderRecord;

  constructor(
    authOrAuthType?:
      | ConstructorParameters<typeof AuthRequestHeader>[0]
      | Parameters<RequestHeaders["addHeaders"]>[0],
    authToken?:
      | ConstructorParameters<typeof AuthRequestHeader>[1]
      | Parameters<RequestHeaders["addHeaders"]>[0],
    ...headers: Parameters<RequestHeaders["addHeaders"]>
  ) {
    this._headers = {};

    if (
      authOrAuthType === undefined
      || authOrAuthType === null
    ) { }

    else if (typeof authOrAuthType === "string") {
      if (
        authToken === undefined
        || authToken === null
      ) {
        const authString: string = authOrAuthType;
        this.auth = authString;
      }
      else if (typeof authToken === "string") {
        const authType: string = authOrAuthType;
        this.setAuthTypeAndToken(
          authType,
          authToken
        );
        this.addHeaders(
          ...headers
        );
      }
      else {
        const authString: string = authOrAuthType;
        this.auth = authString;
        this.addHeaders(
          authToken,
          ...headers
        );
      }
    }

    else if (Symbol.iterator in authOrAuthType) {
      if (
        authToken === undefined
        || authToken === null
        || typeof authToken === "string"
      ) {
        const header0: Parameters<RequestHeaders["addHeaders"]>[0] = authOrAuthType;
        this.addHeaders(
          header0,
          ...headers
        );
      }
      else {
        const header0: Parameters<RequestHeaders["addHeaders"]>[0] = authOrAuthType;
        const header1: Parameters<RequestHeaders["addHeaders"]>[0] = authToken;
        this.addHeaders(header0, header1, ...headers);
      }
    }

    else if (
      authOrAuthType instanceof this.AuthRequestHeader
      || Reflect
        .ownKeys(
          new this.AuthRequestHeader()
        ).every(
          key => key in authOrAuthType
      )
      || Object.getPrototypeOf(authOrAuthType) === this.AuthRequestHeader.prototype
    ) {
      this.auth = authOrAuthType as AuthRequestHeader;
    }
    else {
      if (
        authToken === undefined
        || authToken === null
        || typeof authToken === "string"
      ) {
        const header0: Parameters<RequestHeaders["addHeaders"]>[0] = authOrAuthType;
        this.addHeaders(
          header0,
          ...headers
        );
      }
      else {
        const header0: Parameters<RequestHeaders["addHeaders"]>[0] = authOrAuthType;
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
    headerValue.toString() === "" ?
      this.deleteHeader(headerKey)
      : this._headers[headerKey] = new this.GenericRequestHeader(
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
    ...headers: Array<
      | [Types.stringful, Types.primitive]
      | [Types.stringful, Types.primitive][]
      | Record<Types.stringful, Types.primitive>
      | Map<Types.stringful, Types.primitive>
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
        for (const [key, value] of header as [string, Types.primitive][])
          this.setHeader(key, value);
      }
      else {
        this.setHeader(header[0] as Types.stringful, header[1] as Types.primitive);
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
      Types.stringful,
      RequestHeader<Types.primitive>
    >;

  export interface RequestHeaderRecord extends RequestHeaderRecordProto {
    Authorization?: AuthRequestHeader,
    [key: Types.stringful]: GenericRequestHeader<Types.primitive>
  }

}


module.exports = RequestHeaders;

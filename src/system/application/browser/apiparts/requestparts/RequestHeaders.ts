class RequestHeaders {
  private readonly _auth: {
    scheme: "" | keyof typeof RequestHeaders.AuthScheme;
    token: string;
  };

  private readonly _headers: Map<string, primitive>;

  constructor(
    authOrHeader?:
      | ""
      | keyof typeof RequestHeaders.AuthScheme
      | [string, primitive]
      | RequestHeaders,
    authToken?: string | [string, primitive] | RequestHeaders,
    ...headers: ([string, primitive] | RequestHeaders)[]
  ) {
    this._auth = {
      scheme: "",
      token: "",
    };
    this._headers = new Map<string, primitive>();
    if (authOrHeader === undefined) {
    } else {
      if (typeof authOrHeader === "string") {
        this._auth.scheme = authOrHeader;
        if (authToken === undefined) {
        } else if (typeof authToken === "string") {
          this._auth.token = authToken;
          this.addHeader(...headers);
        } else this.addHeader(authToken, ...headers);
      } else {
      }
    }
  }

  get headers(): typeof RequestHeaders.prototype._headers {
    const headers: Map<string, primitive> = new Map(this._headers);
    if (this.hasAuth()) headers.set("Authorization", this.auth);
    return this._headers;
  }

  get keys(): string[] {
    return [...this.headers.keys()];
  }

  hasHeader(key: string): boolean {
    return this.headers.has(key);
  }

  addHeader(...headers: ([string, primitive] | RequestHeaders)[]): this {
    for (const header of headers) {
      if (Array.isArray(header)) {
        if (header[0] === "") {
        } else if (header[0] === "Authorization") {
          this.auth = String(header[1]);
        } else this._headers.set(header[0], header[1]);
      } else {
        for (const [key, value] of header.headers) {
          this.addHeader([key, value]);
        }
      }
    }
    return this;
  }

  getValue(
    key: string,
  ): ReturnType<typeof RequestHeaders.prototype.getStringValue> {
    return this.getStringValue(key);
  }

  getStringValue(key: string): string {
    return this.hasHeader(key) ? String(this.headers.get(key)) : "";
  }

  getNullableValue(key: string): undefined | primitive {
    return this.headers.get(key);
  }

  getHeader(key: string): string {
    return this.hasHeader(key) ? [key, this.getValue(key)].join(": ") : "";
  }

  deleteHeader(key: string): this {
    this._headers.delete(key);
    return this;
  }

  toString(): string {
    return this.keys.map(key => this.getHeader(key)).join("\r\n");
  }

  get scheme(): typeof RequestHeaders.prototype._auth.scheme {
    return this._auth.scheme;
  }

  set scheme(scheme: typeof RequestHeaders.prototype._auth.scheme) {
    this._auth.scheme = scheme;
  }

  get token(): typeof RequestHeaders.prototype._auth.token {
    return this._auth.token;
  }

  set token(token: typeof RequestHeaders.prototype._auth.token) {
    this._auth.token = token;
  }

  hasAuth(): boolean {
    return this.token !== "";
  }

  get auth(): string {
    return this.hasAuth()
      ? this.scheme === ""
        ? this.token
        : [this.scheme, this.token].join(" ")
      : "";
  }

  set auth(auth: string) {
    const authParts: string[] = auth.trim().split(" ");
    if (authParts.length === 0) {
      this.scheme = "";
      this.token = "";
    } else if (authParts.length === 1) {
      this.scheme = "";
      this.token = authParts[0] ?? "";
    } else {
      if (
        authParts[0] === "" ||
        (authParts[0] ?? "") in RequestHeaders.AuthScheme
      ) {
        this.scheme = authParts[0] as
          | ""
          | keyof typeof RequestHeaders.AuthScheme;
        this.token = authParts.slice(1).join(" ");
      } else {
        this.scheme = "";
        this.token = authParts.join(" ");
      }
    }
  }

  deleteAuth(): this {
    this._auth.scheme = "";
    this._auth.token = "";
    return this;
  }
}

namespace RequestHeaders {
  export enum AuthScheme {
    Bearer,
  }
}

module.exports = RequestHeaders;

const a_RequestHeader: typeof RequestHeader = importModule("requestheader/RequestHeader");

class AuthRequestHeader extends a_RequestHeader<string> {

  private _scheme?: AuthRequestHeader.AuthScheme;
  private _token?: string;

  constructor(
    authOrAuthScheme?:
      | AuthRequestHeader.AuthScheme
      | keyof typeof AuthRequestHeader.AuthScheme
      | AuthRequestHeader,
    authToken?: string
  ) {
    const authHeaderKey: AuthRequestHeader.AuthHeaderKey = "Authorization";
    if (
      authOrAuthScheme === undefined
      || authOrAuthScheme === null
    )
      super(
        authHeaderKey,
        ""
      );
    else if (authOrAuthScheme instanceof AuthRequestHeader) {
      const authHeader: AuthRequestHeader = authOrAuthScheme;
      super(
        authHeaderKey,
        authHeader.value
      );
    }
    else{
      if (
        authToken === undefined
        || authToken === ""
      ) {
        super(
          authHeaderKey,
          ""
        );
      }
      else {
        if (typeof authOrAuthScheme === "string") {
          const authScheme: keyof typeof AuthRequestHeader.AuthScheme = authOrAuthScheme;
          super(
            authHeaderKey,
            [
              authScheme,
              authToken
            ]
              .join(" ")
          );
        } else {
          const authScheme: keyof typeof AuthRequestHeader.AuthScheme = AuthRequestHeader.AuthScheme[
            authOrAuthScheme
          ] as keyof typeof AuthRequestHeader.AuthScheme;
          super(
            authHeaderKey,
            [
              authScheme,
              authToken
            ]
              .join(" ")
          );
        }
      }
    }

    if (
      this.value.split(" ").length >= 2
      && this.value.split(" ")[0] in AuthRequestHeader.AuthScheme
    ) {
      const valueSplitBySpace: string[] = this.value.split(" ");
      this._scheme = AuthRequestHeader.AuthScheme[valueSplitBySpace.shift() as keyof typeof AuthRequestHeader.AuthScheme];
      this._token = valueSplitBySpace.join(" ");
    }
  }

  get scheme():
    | keyof typeof AuthRequestHeader.AuthScheme
    | "" {
    return this._scheme === undefined ?
      ""
      : this._scheme in AuthRequestHeader.AuthScheme ?
        AuthRequestHeader.AuthScheme[this._scheme] as keyof typeof AuthRequestHeader.AuthScheme
        : "";
  }

  set scheme(
    authScheme: typeof AuthRequestHeader.prototype.scheme
  ) {
    if (authScheme === "")
      this.value = "";
    else {
      this.value = [
        AuthRequestHeader.AuthScheme[authScheme],
        this._token
      ]
        .join(" ");
    }
  }

  get token(): string {
    return this._token ?? "";
  }

  set token(
    token: typeof AuthRequestHeader.prototype.token
  ) {
    if (
      token === ""
    )
      this.value = ""

  setAuthSchemeAndToken(
    authOrAuthScheme: ConstructorParameters<typeof AuthRequestHeader>[0],
    token:
  ): this {
    if (
      this.value.split(" ").length >= 2
      && this.value.split(" ")[0] in AuthRequestHeader.AuthScheme
    ) {
      const valueSplitBySpace: string[] = this.value.split(" ");
      this._scheme = AuthRequestHeader.AuthScheme[valueSplitBySpace.shift() as keyof typeof AuthRequestHeader.AuthScheme];
      this._token = valueSplitBySpace.join(" ");
    }
  }

  static get RequestHeader(): typeof RequestHeader {
    return a_RequestHeader;
  }

}

namespace AuthRequestHeader {

  export enum AuthScheme {
    Basic,
    Bearer,
    Digest
  }

  export type AuthHeaderKey = "Authorization";

}

module.exports = AuthRequestHeader;

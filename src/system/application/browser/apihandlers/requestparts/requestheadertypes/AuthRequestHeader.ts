const a_RequestHeader: typeof RequestHeader = importModule("requestheader/RequestHeader");

class AuthRequestHeader extends a_RequestHeader<string> {

  constructor(
    authOrAuthType?:
      | AuthRequestHeader
      | string,
    authToken?: string
  ) {
    if (
      authOrAuthType === undefined
      || authOrAuthType === null
    )
      super(
        "Authorization", ""
      );
    else if (authOrAuthType instanceof AuthRequestHeader) {
      const authRequestHeader: AuthRequestHeader = authOrAuthType;
      super(
        "Authorization",
        authRequestHeader.auth
      );
    }
    else {
      if (authToken === undefined) {
        const authString: string = authOrAuthType;
        super(
          "Authorization",
          authString
        );
      }
      else {
        const authType: string = authOrAuthType;
        super(
          "Authorization",
          [
            authType,
            authToken
          ]
            .join(" ")
        );
      }
    }
  }

  get auth(): typeof RequestHeader.prototype.value {
    return this.value;
  }

  set auth(
    auth: ConstructorParameters<typeof AuthRequestHeader>[0]
  ) {
    this.value = new AuthRequestHeader(auth).value;
  }

  setAuthTypeAndToken(
    authType: string,
    token: string
  ): this {
    this.value = [
      authType,
      token
    ]
      .join(" ");
    return this;
  }

  static get RequestHeader(): typeof RequestHeader {
    return a_RequestHeader;
  }

}

module.exports = AuthRequestHeader;

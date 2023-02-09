const a_RequestHeader: typeof RequestHeader = importModule("requestheader/RequestHeader");

class AuthRequestHeader extends a_RequestHeader {

  constructor(authTypeTokenString: string);
  constructor(authTypeTokenTuple: [string?, string?]);
  constructor(
    authType: string,
    token?: string
  );

  constructor(
    authTypeOrAuthTypeToken: string | [string?, string?],
    token: string = "Bearer"
  ) {
    super(
      "Authorization",
      Array.isArray(authTypeOrAuthTypeToken) ?
        authTypeOrAuthTypeToken.join()
        : token ?
          [
            authTypeOrAuthTypeToken,
            token
          ]
            .join(" ")
          : authTypeOrAuthTypeToken

    );
  }
}

module.exports = AuthRequestHeader;

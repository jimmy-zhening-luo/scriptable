const a_RequestHeader: typeof RequestHeader = importModule("requestheader/RequestHeader");

class AuthRequestHeader extends a_RequestHeader {
  constructor(
    authType: string,
    token: string
  );

  constructor(authTypeTokenString: string);

  constructor(authTypeTokenTuple: [string, string]);

  constructor(
    modeOrModeToken?: string | [string, string],
    token?: string
  ) {
    if (Array.isArray(modeOrModeToken))
      super(
        "Authorization",
        modeOrModeToken.join(" ")
      );
    else if (token === undefined)
      super(
        "Authorization",
        modeOrModeToken
      );
    else
      super(
        "Authorization",
        [modeOrModeToken, token]
          .join(" ")
      );
  }
}

module.exports = AuthRequestHeader;

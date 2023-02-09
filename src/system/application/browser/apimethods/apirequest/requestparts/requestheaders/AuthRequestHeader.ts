const a_RequestHeader: typeof RequestHeader = importModule("requestheader/RequestHeader");

class AuthRequestHeader extends a_RequestHeader<string> {

  constructor(authString: string);
  constructor(
    authType: string,
    token: string
  );

  constructor(
    authTypeOrAuthStringOrTuple: string,
    token?: string
  ) {
    super(
      "Authorization",
      token === undefined ?
        authTypeOrAuthStringOrTuple
        : [
          authTypeOrAuthStringOrTuple,
          token
        ]
          .join(" ")
    );
  }

  get auth(): string {
    return this.value;
  }

  set auth(
    authString: string
  ) {
    this.value = authString;
  }

  setAuthTypeAndToken(
    authType: string,
    token: string
  ) {
    this.value = [
      authType,
      token
    ]
      .join(" ");
  }

}

module.exports = AuthRequestHeader;

class RequestHeaders {

  private _authHeader: AuthRequestHeader[];
  private _headers: RequestHeader[];

  constructor(
    authHeader?:
      | string
      | [string?, string?],
    headers?:
      | string
      | string[]
      | [string, Types.primitive]
      | [string, Types.primitive][]
      | {
        [key: string]: Types.primitive
      }
  ) {

  }
}

namespace RequestHeaders {

  export const _AuthRequestHeader: typeof AuthRequestHeader = importModule("requestheaders/AuthRequestHeader");

  export const _GenericRequestHeader: typeof GenericRequestHeader = importModule("requestheaders/GenericRequestHeader");

}

module.exports = RequestHeaders;

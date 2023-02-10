class RequestBody {
  private readonly _body:
    | string
    | RequestBody.RequestBodyInterface;

  constructor(body?:
    | string
    | RequestBody.RequestBodyInterface)
  {
    this._body = body || "";
  }

  toObject(): RequestBody.RequestBodyInterface {
    if (typeof this._body === "string")
      return this.toStringObject();
    else
      return this._body;
  }

  toStringObject(): RequestBody.StringRequestBodyInterface {
    if (typeof this._body === "string") {
      try {
        return JSON.parse(this._body);
      } catch (e) {
        return {};
      }
    }
    else
      return JSON.parse(JSON.stringify(this._body));
  }

  toString(): string {
    if (typeof this._body === "string")
      return this._body;
    else
      return JSON.stringify(this._body);
  }
}

namespace RequestBody {
  export interface RequestBodyInterface {
    [key: Types.stringful]: (
      | Types.primitive
      | RequestBodyInterface
      | RequestBodyInterface[]
    )
  }

  export interface StringRequestBodyInterface {
    [key: Types.stringful]: (
      | string
      | StringRequestBodyInterface
      | StringRequestBodyInterface[]
    )
  }
}

module.exports = RequestBody;

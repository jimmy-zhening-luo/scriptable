class RequestBody {

  private readonly _body:
    | string
    | RequestBody.RequestBodyRecord;

  constructor(
    body?: typeof RequestBody.prototype._body
  ) {
    this._body = body ?? "";
  }

  toObject(): RequestBody.RequestBodyRecord {
    if (typeof this._body === "string")
      return this.toStringObject();
    else
      return this._body;
  }

  toStringObject(): RequestBody.RequestBodyStringRecord {
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

  export interface RequestBodyRecord {
    [key: string]: RequestBodyValue
  }

  export interface RequestBodyStringRecord {
    [key: string]: RequestBodyStringValue
  }

  export type RequestBodyValue =
    | primitive
    | RequestBodyRecord
    | RequestBodyValue[];

  export type RequestBodyStringValue =
    | string
    | RequestBodyRecord
  | RequestBodyStringValue[];

}

module.exports = RequestBody;

class RequestBody {
  private readonly _body: string | RequestBody.RequestBodyRecord;

  constructor(body?: typeof RequestBody.prototype._body) {
    this._body = body ?? "";
  }

  toObject(): RequestBody.RequestBodyRecord {
    try {
      if (typeof this._body === "string") {
        try {
          const parsedJson: unknown = JSON.parse(this._body);
          if (_validate(parsedJson))
            return parsedJson as RequestBody.RequestBodyRecord;
          else
            throw new SyntaxError(
              `RequestBody.ts: toObject: this._body's string representation is valid JSON but not a valid Request Body syntax.`,
            );

          function _validate(parsedJson: unknown): boolean {
            try {
              // TO-DO: Validate JSON schema.
              return parsedJson !== undefined;
            } catch (e) {
              throw new EvalError(
                `RequestBody: Error while validating whether parsed JSON is matches the RequestBodyRecord schema: \n${e}`,
              );
            }
          }
        } catch (e) {
          throw new SyntaxError(
            `RequestBody.ts: toStringObject: this._body's string representation is not a valid Request Body syntax: \n${e}`,
          );
        }
      } else return this._body;
    } catch (e) {
      throw new EvalError(
        `RequestBody.ts: toStringObject: Error while parsing RequestBody to string object: \n${e}`,
      );
    }
  }

  toString(): string {
    if (typeof this._body === "string") return this._body;
    else return JSON.stringify(this._body);
  }
}

namespace RequestBody {
  export interface RequestBodyRecord {
    [key: string]: RequestBodyValue;
  }

  export type RequestBodyValue =
    | primitive
    | RequestBodyRecord
    | RequestBodyValue[];
}

module.exports = RequestBody;

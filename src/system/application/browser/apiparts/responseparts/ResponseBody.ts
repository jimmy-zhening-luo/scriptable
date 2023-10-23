class ResponseBody {
  readonly response: unknown;

  constructor(response?: unknown) {
    this.response = this.parseResponse(response);
  }

  parseResponse(response?: unknown): typeof ResponseBody.prototype.response {
    return response ?? "";
  }

  toObject(): unknown {
    try {
      if (typeof this.response === "string") {
        try {
          const parsedJson: unknown = JSON.parse(this.response);
          if (_validate(parsedJson)) return parsedJson;
          else
            throw new SyntaxError(
              `ResponseBody: toObject: this.response's string representation is valid JSON but not a valid Response Body syntax.`,
            );

          function _validate(parsedJson: unknown): boolean {
            try {
              // TO-DO: Validate JSON schema.
              return parsedJson !== undefined;
            } catch {
              throw new EvalError(
                `ResponseBody: toObject: Error while validating whether parsed JSON is matches the ResponseBodyRecord schema.`,
              );
            }
          }
        } catch {
          throw new SyntaxError(
            `ResponseBody: toObject: this.response's string representation is not a valid Response Body syntax.`,
          );
        }
      } else return this.response;
    } catch {
      throw new EvalError(
        `ResponseBody: toObject: Error while getting the object form of response body.`,
      );
    }
  }

  toString(): string {
    return typeof this.response === "string"
      ? this.response
      : JSON.stringify(this.response);
  }
}

module.exports = ResponseBody;

class ResponseBody {

  readonly response:
    Exclude<
      | any
      ,
      | null
      | undefined
    >;

  constructor(
    response?: any
  ) {
    this.response = this.parseResponse(response);
  }

  parseResponse(
    response?: any
  ): typeof ResponseBody.prototype.response {
    return response ?? "";
  }

  toObject(): Record<string, any> {
    try {
      return typeof this.response === "string" ?
        JSON.parse(
          this.response
        )
        : JSON.parse(
          JSON.stringify(
            this.response
          )
        );
    }
    catch {
      return {};
    }
  }

  toString(): string {
    return typeof this.response === "string" ?
      this.response
      : JSON.stringify(
        this.response
      );
  }
}

module.exports = ResponseBody;

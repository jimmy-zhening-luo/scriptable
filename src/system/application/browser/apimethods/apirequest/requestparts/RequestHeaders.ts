class RequestHeaders {
  readonly headers: RequestHeader[];

  constructor(
    headerOrHeaders?:
      | string
      | [string, string | number | boolean]
      | [string, string | number | boolean][]
      | RequestHeader
      | RequestHeader[]
      | RequestHeaders
      | { [key: string]: string | number | boolean },
    value?: string | number | boolean
  ) {
    this.headers = [];
    if (headerOrHeaders === undefined) { }
    else if (headerOrHeaders instanceof RequestHeaders)
      this.headers = headerOrHeaders.headers;
    else if (typeof headerOrHeaders === "string")
      this.add(headerOrHeaders, value);
    else if (Array.isArray(headerOrHeaders)) {
      if (headerOrHeaders.length === 0) { }
      else if (Array.isArray(headerOrHeaders[0]))
        headerOrHeaders.forEach(header => this.add(header as [string, string | number | boolean]));
      else if (typeof headerOrHeaders[0] === "string")
        this.add(headerOrHeaders as [string, string | number | boolean]);
      else
        this.headers = headerOrHeaders as RequestHeader[];
    }
  }

  add(
    headerOrKeyValue:
      | string
      | [string, string | number | boolean]
      | RequestHeader,
    value?: string | number | boolean
  ): void {

  }
}

namespace RequestHeaders {
  export const _RequestHeader: typeof RequestHeader = importModule("requestheaders/requestheader/RequestHeader");
}

module.exports = RequestHeaders;

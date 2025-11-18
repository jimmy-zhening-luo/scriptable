import type { Method } from "./method";

export default class {
  public readonly query;
  public readonly headers;

  constructor(
    public readonly url: string,
    query?: FieldTable,
    headers?: FieldTable,
  ) {
    this.query = query === undefined
      ? new Map<string, string>
      : new Map<string, string>(Object.entries(query));
    this.headers = headers === undefined
      ? new Map<string, string>
      : new Map<string, string>(Object.entries(headers));
  }

  public async request<Response = object>(
    method: Method = "GET",
    query?: FieldTable,
    headers?: FieldTable,
  ) {
    const requery = query === undefined
      ? this.query
      : new Map(
          this.query.size === 0
            ? Object.entries(query)
            : [
                ...this.query,
                ...Object.entries(query),
              ],
        ),
    request = new Request(
      requery.size === 0
        ? this.url
        : (
          this.url
            + "?"
            + Array
              .from(
                requery,
                [key, value] => encodeURIComponent(key)
                  + "="
                  + encodeURIComponent(value),
              )
              .join("&")
        ),
    );

    request.timeoutInterval = 10;

    if (method !== "GET")
      request.method = method;

    const reheaders = headers === undefined
      ? this.headers
      : new Map(
          this.headers.size === 0
            ? Object.entries(headers)
            : [
                ...this.headers,
                ...Object.entries(headers),
              ],
        );

    if (reheaders.size !== 0)
      request.headers = Object.fromEntries(reheaders);

    return (await request.loadJSON() as Response);
  }

  public [Symbol.toPrimitive](hint: toPrimitive) {
    return hint === "number"
      ? NaN
      : this.url;
  }

  public toString() {
    return this.url;
  }
}

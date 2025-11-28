import type { Method } from "./types";

export default class {
  public readonly query;
  public readonly headers;

  constructor(
    public readonly url: string,
    query?: FieldTable,
    headers?: FieldTable,
    auth?: string,
    agent?: string,
  ) {
    this.query = query
      ? new Map<string, string>(Object.entries(query))
      : new Map<string, string>;
    this.headers = headers
      ? new Map<string, string>(Object.entries(headers))
      : new Map<string, string>;

    if (auth)
      this.headers.set("Authorization", auth);

    if (agent)
      this.headers.set("User-Agent", agent);
  }

  public async request<Response = object>(
    method: Method = "GET",
    query?: FieldTable,
    headers?: FieldTable,
    body?: Record<string, unknown>,
  ) {
    const requery = query
      ? new Map(
          this.query.size
            ? [
                ...this.query,
                ...Object.entries(query),
              ]
            : Object.entries(query),
        )
      : this.query,
    request = new Request(
      requery.size
        ? this.url
        + "?"
        + Array
          .from(
            requery,
            ([key, value]) => encodeURIComponent(key)
              + "="
              + encodeURIComponent(value),
          )
          .join("&")
        : this.url,
    );

    request.timeoutInterval = 10;

    if (method !== "GET")
      request.method = method;

    if (body !== undefined)
      request.body = JSON.stringify(body);

    const reheaders = headers
      ? new Map(
          this.headers.size
            ? [
                ...this.headers,
                ...Object.entries(headers),
              ]
            : Object.entries(headers),
        )
      : this.headers;

    if (reheaders.size)
      request.headers = Object.fromEntries(reheaders);

    return await request.loadJSON() as Response;
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

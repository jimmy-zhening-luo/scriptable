import regex from "./regex";

export default class Url {
  public readonly scheme;
  public readonly host;
  public readonly path;
  private readonly _query;
  private _fragment;

  constructor(string = "") {
    try {
      if (string === "")
        throw new URIError("Empty string cannot be an URL");

      const parts = Url.parse(string)
        ?? Url.parse(`https://${string}`);

      if (parts === null)
        throw new URIError(
          "Not parseable to URL",
          { cause: string },
        );

      this.scheme = parts.scheme;
      this.host = parts.host;
      this.path = parts.path;
      this._query = new Map<string, Null<string>>(
        parts.query === "?"
          ? []
          : parts
              .query
              .slice(1)
              .split("&")
              .map(
                param => param.split("=") as Arrayful,
              )
              .map(
                ([name, ...value]) => [
                  name,
                  value.length === 0
                    ? null
                    : value.join("="),
                ],
              ),
      );
      this._fragment = parts.fragment === "#"
        ? ""
        : parts.fragment;
    }
    catch (e) {
      throw new URIError(
        "Failed to parse URL",
        { cause: e },
      );
    }
  }

  public get schemeHost() {
    return [
      this.scheme,
      this.host,
    ].join("://") as stringful;
  }

  public get query() {
    const query = [
      ...this
        ._query
        .entries(),
    ]
      .map(
        ([name, value]) => value === null
          ? name
          : [name, value].join("="),
      )
      .join("&");

    return query === ""
      ? ""
      : `?${query}`;
  }

  public get fragment() {
    return this._fragment;
  }

  public get params() {
    return [...this._query.keys()];
  }

  private static parse(string: string) {
    const match = regex.exec(string);

    if (match === null)
      return null;

    const {
      scheme: parsedScheme,
      host,
      path,
      query = "?",
      fragment = "#",
    } = match.groups as {
      scheme: stringfully<"URL:scheme">;
      host: string;
      path: string;
      query?: string;
      fragment?: string;
    },
    scheme = [
      "https",
      "http",
    ].includes(
      parsedScheme.toLocaleLowerCase(),
    )
      ? "https" as stringfully<"URL:scheme">
      : parsedScheme;

    return scheme === "https" && host === ""
      ? null
      : {
          scheme,
          host: host.toLocaleLowerCase() as stringfully<"URL:host">,
          path,
          query,
          fragment,
        };
  }

  public param(param: string) {
    return this._query.get(param);
  }

  public deleteParams(
    ...params: string[]
  ) {
    for (const param of params)
      this._query.delete(param);
  }

  public deleteParamsExcept(
    ...params: string[]
  ) {
    const exceptions = new Set<string>(params);

    this.deleteParams(
      ...this
        .params
        .filter(param => !exceptions.has(param)),
    );
  }

  public replaceParamName(
    find: string,
    replace: string,
  ) {
    const value = this.param(find);

    this.deleteParams(find);

    if (typeof value !== "undefined")
      this._query.set(
        replace,
        value,
      );
  }

  public dropQuery() {
    this._query.clear();
  }

  public dropFragment() {
    this._fragment = "";
  }
}

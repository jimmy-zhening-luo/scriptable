import regex from "./regex";

export default class Url {
  public readonly scheme;
  public readonly host;
  public readonly path;
  private _fragment;
  private readonly queryMap;

  constructor(string = "") {
    if (string === "")
      throw new URIError("Empty string cannot be URL");
    
    const parts = Url.parse(string)
      ?? Url.parse(`https://${string}`);

    if (parts === null)
      throw new URIError(
        "String unparsesble to URL",
        { cause: string },
      );

    this.scheme = parts.scheme;
    this.host = parts.host;
    this.path = parts.path;
    this._fragment = parts.fragment === "#"
      ? ""
      : parts.fragment;
    this.queryMap = new Map<string, string>(
      parts
        .query
        .slice(1)
        .split("&")
        .map(param => param.split("=") as Arrayful)
        .map(([name, ...value]) => [name, value.join("=")]),
    );
  }

  public get schemeHost() {
    return [
      scheme,
      host,
    ].join("://") as stringful;
  }

  public get query() {
    const query = [...this.queryMap.entries()]
      .map(param => param.join("="))
      .join("&");

    return query === ""
      ? ""
      : `?${query}`;
  }

  public get fragment() {
    return this._fragment;
  }

  public get params() {
    return [...this.queryMap.keys()];
  }

  private static parse(string: string) {
    const {
      scheme = "",
      host = "",
      path = "",
      query = "",
      fragment = "",
    } = regex
      .exec(string)
      ?.groups
      ?? {},
    http = Url.isHttp(scheme);

    return scheme === ""
      || http
      && !host.includes(".")
      ? null
      : {
          scheme: (http ? "https" : scheme) as stringfully<"Url[scheme]">,
          host: host.toLocaleLowerCase() as stringfully<"Url[host]">,
          path,
          query,
          fragment,
        };
  }

  private static isHttp(scheme: string) {
    return [
      "https",
      "http",
    ].includes(
      scheme.toLocaleLowerCase(),
    );
  }

  public getParam(param: string) {
    return this.queryMap.get(param);
  }

  public deleteParams(
    ...params: string[]
  ) {
    for (const param of params)
      this.queryMap.delete(param);
  }

  public deleteParamsExcept(
    ...params: string[]
  ) {
    const kept = new Set<string>(params);

    this.deleteParams(
      ...this
        .params
        .filter(param => !kept.has(param)),
    );
  }

  public replaceParam(
    find: string,
    replace: string,
  ) {
    const value = this.getParam(find);

    this.deleteParams(find);

    if (typeof value !== "undefined")
      this.queryMap.set(
        replace,
        value,
      );
  }

  public dropQuery() {
    this.queryMap.clear();
  }

  public dropFragment() {
    this._fragment = "";
  }
}

import regex from "./regex";

export default class Url {
  public readonly scheme;
  public readonly host;
  public readonly path;
  public readonly fragment;
  private readonly queryMap;

  constructor(string: string) {
    const parts = (
      string => Url.parse(string)
        ?? Url.parse(`https://${string}`)
    )(string);

    if (parts === null)
      throw new URIError("Unparseable to URL", { cause: string });

    const {
      scheme,
      host,
      path,
      query,
      fragment,
    } = parts;

    this.scheme = scheme;
    this.host = host;
    this.path = path;
    this.fragment = fragment === "" ? "" : `#${fragment}`;
    this.queryMap = new Map<string, string>(
      query
        .split("&")
        .map(param => param.split("="))
        .filter((param): param is [stringful, ...string[]] => param[0] !== "")
        .map(([key, ...value]) => [key, value.join("=")]),
    );
  }

  public get query() {
    const query = [...this.queryMap.entries()]
      .map(pair => pair.join("="))
      .join("&");

    return query === "" ? "" : `?${query}`;
  }

  public get params() {
    return [...this.queryMap.keys()];
  }

  private static parse(candidate: string) {
    const {
      scheme = "",
      host = "",
      path = "",
      query = "",
      fragment = "",
    } = regex.exec(candidate)?.groups ?? {},
    http = [
      "https",
      "http",
    ]
      .includes(scheme.toLocaleLowerCase());

    return scheme === "" || http && !host.includes(".")
      ? null
      : {
          scheme: (http ? "https" : scheme) as stringfully<"Url[scheme|host]">,
          host: host.toLocaleLowerCase() as stringfully<"Url[scheme|host]">,
          path,
          query: query.slice(1),
          fragment: fragment.slice(1),
        };
  }

  public getParam(param: string) {
    return this.queryMap.get(param);
  }

  public deleteParams(...params: string[]) {
    for (const param of params)
      this.queryMap.delete(param);
  }

  public keepParams(...params: string[]) {
    const keep = new Set<string>(params);

    this.deleteParams(
      ...this.params
        .filter(param => !keep.has(param)),
    );
  }

  public replaceParam(find: string, replace: string) {
    const value = this.getParam(find);

    this.deleteParams(find);

    if (typeof value !== "undefined")
      this.queryMap.set(replace, value);
  }

  public deleteQuery() {
    this.queryMap.clear();
  }
}

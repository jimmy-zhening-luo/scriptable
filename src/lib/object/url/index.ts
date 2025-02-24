import regex from "./regex";

export default class Url {
  public readonly scheme: stringfully<"URL: scheme || host">;
  public readonly host: stringfully<"URL: scheme || host">;
  public readonly path: string;
  public readonly fragment: string;
  private readonly queryMap: Map<stringful, string>;

  constructor(url: string) {
    const parts = Url.parse(url) ?? Url.parse(`https://${url}`);

    if (parts === null)
      throw new SyntaxError("Unparseable to URL", { cause: url });

    const {
      scheme, host, path, query, fragment,
    } = parts;

    this.scheme = scheme;
    this.host = host;
    this.path = path;
    this.fragment = fragment;
    this.queryMap = new Map<stringful, string>(
      query
        .split("&")
        .map(pair => pair.split("=") as Arrayful)
        .filter((pair): pair is [stringful, ...string[]] => pair[0] !== "")
        .map(([param, ...value]) => [param, value.join("=")] as const),
    );
  }

  public get query() {
    return [...this.queryMap.entries()]
      .map(pair => pair.join("="))
      .join("&");
  }

  public get params() {
    return [...this.queryMap.keys()];
  }

  private static parse(url: string) {
    const {
      scheme = "",
      host = "",
      path = "",
      query = "",
      fragment = "",
    } = regex.exec(url)?.groups ?? {},
    http = ["https", "http"].includes(scheme.toLocaleLowerCase());

    return scheme === "" || http && !host.includes(".")
      ? null
      : {
          scheme: (http ? "https" : scheme) as stringfully<"URL: scheme || host">,
          host: host.toLocaleLowerCase() as stringfully<"URL: scheme || host">,
          path,
          query: query.slice(1),
          fragment: fragment.slice(1),
        };
  }

  public getParam(param: string) {
    return this.queryMap.get(param as stringful) ?? null;
  }

  public deleteParams(...params: string[]) {
    for (const param of params)
      this.queryMap.delete(param as stringful);
  }

  public keepParams(...params: string[]) {
    const keep = new Set<stringful>(params as stringful[]);

    this.deleteParams(...this.params.filter(param => !keep.has(param)));
  }

  public replaceParam(find: string, replace: string) {
    const value = this.getParam(find);

    this.deleteParams(find);

    if (value !== null)
      this.queryMap.set(replace as stringful, value);
  }

  public deleteQuery() {
    this.queryMap.clear();
  }
}

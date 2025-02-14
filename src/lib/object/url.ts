export default class Url {
  public readonly scheme: stringfully<"URL: scheme || host">;
  public readonly host: stringfully<"URL: scheme || host">;
  public readonly path: string;
  public readonly fragment: string;
  private readonly queryMap: Map<stringful, string>;

  constructor(url: string) {
    const {
      scheme,
      host,
      path,
      query,
      fragment,
    } = this.parse(url) ?? this.parse(`https://${url}`);

    if (parts === null)
      throw new SyntaxError("Unparseable to URL", { cause: url });

    this.scheme = scheme;
    this.host = host;
    this.path = path;
    this.fragment = fragment;
    this.queryMap = new Map<stringful, string>(
      query
        .split("&")
        .map(pair => pair.split("=") as Arrayful)
        .filter((pair): pair is readonly [stringful, ...string[]] => pair[0] !== "")
        .map(([param, ...value]) => [param, value.join("=")] as const),
    );
  }

  public get query() {
    return queryMap.size === 0
      ? ""
      : [...queryMap.entries]
  }
  
  public getParam(param: string) {
    queryMap.get(param) ?? null;
  }

  public deleteParam(param: string) {
    queryMap.delete(param);
  }

  private parse(url: string) {
    const {
      scheme = "",
      host = "",
      path = "",
      query = "",
      fragment = "",
    } = (/^(?<scheme>\p{L}[-+.\p{L}\d]+):\/\/(?<host>(?:(?:[-~!$&'()*+,;=.\w]|(?:%[a-fA-F\d]{2}))*(?::\d+)?))(?<path>(?:\/(?:(?:[-~!$&'()*+,;=.\w]|(?:%[a-fA-F\d]{2}))|[:@])*)*)(?<query>(?:\?(?:(?:(?:[-~!$&'()*+,;=.\w]|(?:%[a-fA-F\d]{2}))|[:@])|[/?])*)|)(?<fragment>(?:#(?:(?:(?:[-~!$&'()*+,;=.\w]|(?:%[a-fA-F\d]{2}))|[:@])|[/?])*)|)$/u)
      .exec(url)?.groups ?? {},
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
}

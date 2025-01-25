export default class Url {
  public readonly scheme: stringfully<"URL: scheme || host">;
  public readonly host: stringfully<"URL: scheme || host">;
  public readonly path: string;
  public readonly query: string;
  public readonly fragment: string;

  constructor(url: string) {
    const parts = Url.parse(url) ?? Url.parse(`https://${url}`);

    if (parts === null)
      throw new SyntaxError("Unparseable to URL", { cause: url });

    this.scheme = parts.scheme;
    this.host = parts.host;
    this.path = parts.path;
    this.query = parts.query;
    this.fragment = parts.fragment;
  }

  private static parse(url: string) {
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
          fragment,
        };
  }
}

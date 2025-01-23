export default function (
  string: string,
  omitHttp = false,
) {
  function parse(string: string, omitHttp: boolean) {
    const {
      scheme = "",
      host = "",
      path = "",
      query = "",
      fragment = "",
    } = (/(?(DEFINE)(?<unsubx>[-~!$&'()*+,;=\.\w]|(?:%[a-fA-F\d]{2}))(?<pch>(?P>unsubx)|[:@])(?<qfch>(?P>pch)|[\/?]))^(?<scheme>\pL[-+\.\pL\d]+):\/\/(?<host>(?:(?P>unsubx)*(?::\d+)?))(?<path>(?:\/(?P>pch)*)*)(?<query>(?:\?(?P>qfch)*)|)(?<fragment>(?:#(?P>qfch)*)|)$/u).exec(string)?.groups ?? {},
    http = ["https", "http"].includes(scheme.toLocaleLowerCase());

    return scheme === "" || http && !host.includes(".")
      ? null
      : {
          scheme: (http
            ? omitHttp
              ? ""
              : "https"
            : scheme) as stringfully<"URL: scheme || host">,
          host: host.toLocaleLowerCase() as stringfully<"URL: scheme || host">,
          path,
          query,
          fragment,
        };
  }

  const parts = parse(string, omitHttp) ?? parse(`https://${string}`, omitHttp);

  if (parts === null)
    throw new SyntaxError("Unparseable to URL", { cause: string });

  return parts;
}

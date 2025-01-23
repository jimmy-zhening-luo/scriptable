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
    } = (/^(?<scheme>\p{L}[-+\.\p{L}\d]+):\/\/(?<host>(?:(?:[-~!$&'()*+,;=\.\w]|(?:%[a-fA-F\d]{2}))*(?::\d+)?))(?<path>(?:\/(?:(?:[-~!$&'()*+,;=\.\w]|(?:%[a-fA-F\d]{2}))|[:@])*)*)(?<query>(?:\?(?:(?:(?:[-~!$&'()*+,;=\.\w]|(?:%[a-fA-F\d]{2}))|[:@])|[\/?])*)|)(?<fragment>(?:#(?:(?:(?:[-~!$&'()*+,;=\.\w]|(?:%[a-fA-F\d]{2}))|[:@])|[\/?])*)|)$/u)
      .exec(string)?.groups ?? {},
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

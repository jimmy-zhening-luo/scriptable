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
    } = (/^(?:(?<scheme>[^:/?#]+):)?(?:\/\/(?<host>[^/?#]*))?(?<path>[^?#]*)(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?/u)
      .exec(string)?.groups ?? {},
    http = ["https", "http"].includes(scheme);

    return scheme === "" || http && !host.includes(".")
      ? null
      : {
          scheme: http && omitHttp
            ? "" 
            : scheme.toLocaleLowerCase(),
          host: host.toLocaleLowerCase(),
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

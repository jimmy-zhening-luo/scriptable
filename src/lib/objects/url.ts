function url(string: string) {
  const parse = (string: string, tryHttp = false) => (({
    scheme = "",
    host = "",
    path = "",
    query = "",
    fragment = "",
  }) => scheme === "" || tryHttp && host === "" && path === ""
    ? null
    : {
        scheme: scheme.toLocaleLowerCase(),
        host: host.toLocaleLowerCase(),
        path,
        query,
        fragment,
      })((/^(?:(?<scheme>[^:/?#]+):)?(?:\/\/(?<host>[^/?#]*))?(?<path>[^?#]*)(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?/u)
    .exec(`${tryHttp ? "https" : ""}${string}`)
    ?.groups ?? {}),
  parts = parse(string) ?? parse(string, true);

  if (parts === null)
    throw new SyntaxError("Unparseable to URL", { cause: string });

  return parts;
}

export default url;

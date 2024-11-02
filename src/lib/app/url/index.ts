function url(string: string) {
  const parse = (string: string, tryHttp = false) => {
    const parts = (/^(?:(?<scheme>[^:/?#]+):)?(?:\/\/(?<host>[^/?#]*))?(?<path>[^?#]*)(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?/u)
      .exec(`${tryHttp ? "https" : ""}${string}`)
      ?.groups,
    {
      scheme = "",
      host = "",
      path = "",
      query = "",
      fragment = "",
    } = typeof parts === "undefined" ? {} : parts;

    return scheme.length > 0 && (!tryHttp || host.length > 0 || path.length > 0)
      ? {
          scheme: scheme.toLocaleLowerCase(),
          host: host.toLocaleLowerCase(),
          path,
          query,
          fragment,
        }
      : null;
  },
  parts = parse(string) ?? parse(string, true);

  if (parts === null)
    throw new SyntaxError("Unparseable to URL", { cause: string });

  return parts;
}

export default url;
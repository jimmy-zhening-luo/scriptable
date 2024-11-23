export default function (string: string) {
  function parse(string: string) {
    const {
      scheme = "",
      host = "",
      path = "",
      query = "",
      fragment = "",
    } = (/^(?:(?<scheme>[^:/?#]+):)?(?:\/\/(?<host>[^/?#]*))?(?<path>[^?#]*)(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?/u)
      .exec(string)?.groups ?? {};

    return scheme === "" || ["https", "http"].includes(scheme) && (host === "" || !host.includes("."))
      ? null
      : {
          scheme: scheme.toLocaleLowerCase(),
          host: host.toLocaleLowerCase(),
          path,
          query,
          fragment,
        };
  }

  const parts = parse(string) ?? parse(`https://${string}`);

  if (parts === null)
    throw new SyntaxError("Unparseable to URL", { cause: string });

  return parts;
}

export default function (string: string) {
  function parse(string: string, tryHttp = false) {
    const {
      scheme = "",
      host = "",
      path = "",
      query = "",
      fragment = "",
    } = (/^(?:(?<scheme>[^:/?#]+):)?(?:\/\/(?<host>[^/?#]*))?(?<path>[^?#]*)(?:\?(?<query>[^#]*))?(?:#(?<fragment>.*))?/u)
      .exec(`${tryHttp ? "https://" : ""}${string}`)
      ?.groups ?? {};

    return scheme === "" || tryHttp && host === "" && path === ""
      ? null
      : {
          scheme: scheme.toLocaleLowerCase(),
          host: host.toLocaleLowerCase(),
          path,
          query,
          fragment,
        };
  }

  const parts = parse(string) ?? parse(string, true);

  if (parts === null)
    throw new SyntaxError("Unparseable to URL", { cause: string });

  return parts;
}

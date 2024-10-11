function url(url: string) {
  const parseURL = (url: string, tryHttp = false) => {
    const is = (part: undefined | string): part is stringful => typeof part !== "undefined" && part.length > 1,
    normalize = (part = "", lower = false) => lower ? part.toLowerCase() : part,
    [
      ,,scheme,,host,
      path,,query,,fragment,
    ] = (/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/u).exec(`${tryHttp ? "https" : ""}${url}`) ?? [];

    return is(scheme) && (!tryHttp || is(host) || is(path))
      ? {
          scheme: normalize(scheme, true),
          host: normalize(host, true),
          path: normalize(path),
          query: normalize(query),
          fragment: normalize(fragment),
        }
      : null;
  },
  normalize = (part = "", lower = false) => lower ? part.toLowerCase() : part,
  parts = this.parseURL(url) ?? this.parseURL(url, true);

  if (parts === null)
    throw new SyntaxError("Unparseable to URL", { cause: url });

  return parts;
}

module.exports = url;
export type url = typeof url;

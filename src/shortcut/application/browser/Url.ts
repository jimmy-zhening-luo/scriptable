class Url {
  #scheme: Scheme;
  #host: Host;
  #port: Port;
  #path: Path;
  #query: Query;
  #fragment: Fragment;
  constructor();
  constructor(url: Url);
  constructor(urlparts: Url.UrlParts);
  constructor(schemehost: string)
  constructor(url: string);
  constructor(
    scheme: Scheme | string,
    host: Host | string
  );
  constructor(
    scheme: Scheme | string,
    host: Host | string,
    port?: Port | number | string,
    path?: Path | string,
    query?: Query | string,
    fragment?: Fragment | string
  );
  constructor(
    head?: Url | Url.UrlParts | Scheme | string,
    host?: Host | string,
    port?: Port | number | string,
    path?: Path | string,
    query?: Query | string,
    fragment?: Fragment | string
  ) {
    if (head === undefined) {
      this.#scheme = new Url._Scheme();
      this.#host = new Url._Host();
      this.#port = new Url._Port();
      this.#path = new Url._Path();
      this.#query = new Url._Query();
      this.#fragment = new Url._Fragment();
    }
    else if (head instanceof Url) {
      this.#scheme = head.scheme;
      this.#host = head.host;
      this.#port = head.port;
      this.#path = head.path;
      this.#query = head.query;
      this.#fragment = head.fragment;
    }
    else if (typeof head === "string"
      && host === undefined
      && port === undefined
      && path === undefined
      && query === undefined
      && fragment === undefined
    ) {
      const parsedUrl: Url = this.parse(head);
      this.#scheme = parsedUrl.scheme;
      this.#host = parsedUrl.host;
      this.#port = parsedUrl.port;
      this.#path = parsedUrl.path;
      this.#query = parsedUrl.query;
      this.#fragment = parsedUrl.fragment;
    }
    else if (host !== undefined) {
      this.#scheme = new Url._Scheme(head);
      this.#host = new Url._Host(host);
      this.#port = new Url._Port(port);
      this.#path = new Url._Path(path);
      this.#query = new Url._Query(query);
      this.#fragment = new Url._Fragment(fragment);
    }
    else {
      this.#scheme = new Url._Scheme(head.scheme);
      this.#host = new Url._Host(head.host);
      this.#port = new Url._Port(head.port);
      this.#path = new Url._Path(head.path);
      this.#query = new Url._Query(head.query);
      this.#fragment = new Url._Fragment(head.fragment);
    }
    
    function parse(url: string): Url {
      const urlParts: Url.UrlParts = {
        
      };
      return new Url(urlParts);
    }
  }

  get scheme(): Scheme {
    return this.#scheme;
  }

  set scheme(
    scheme: (string
      | Scheme
      | undefined
    )
  ) {
    this.#scheme = new Url._Scheme(
      scheme
    );
  }

  get host(): Host {
    return this.#host;
  }

  set host(
    host: (string
      | Host
      | undefined
    )
  ) {
    this.#host = new Url._Host(host);
  }

  get port(): Port {
    return this.#port;
  }

  set port(
    port: (string
      | number
      | Port
      | undefined
    )
  ) {
    this.#port = new Url._Port(port);
  }

  get path(): Path {
    return this.#path;
  }

  set path(
    path: (string
      | Path
      | undefined
    )
  ) {
    this.#path = new Url._Path(path);
  }

  get query(): Query {
    return this.#query
  }

  set query(
    query: (string
      | Query
      | undefined
    )
  ) {
    this.#query = new Url._Query(query);
  }

  get fragment(): Fragment {
    return this.#fragment;
  }

  set fragment(
    fragment: (string
      | Fragment
      | undefined
    )
  ) {
    this.#fragment = new Url._Fragment(
      fragment
    );
  }

  get string(): string {
    return Url.joinUrlParts(this);
  }

  toString(): string {
    return this.string;
  }

  private static joinUrlParts(
    url: Url
  ): string {
    return (
      Url.appendFragmentToLeft(
        Url.appendQueryToLeft(
          Url.appendPathToLeft(
            Url.appendPortToLeft(
              Url.appendHostToScheme(
                url.scheme,
                url.host
              ),
              url.port
            ),
            url.path
          ),
          url.query
        ),
        url.fragment
      )
    ).trim();
  }

  static appendHostToScheme(
    scheme: (string
      | Scheme
    ),
    host: (string
      | Host
    )
  ): string {
    const left: string = new Url._Scheme(scheme).string;
    const right: string = new Url._Host(host).string;
    const delim: string = left === String() ?
      String()
      : "://";
    return [left, right]
      .join(delim)
      .trim();
  }

  static appendPortToLeft(
    left: string,
    port: (string
      | number
      | Port
    )
  ): string {
    left = left.trim();
    const right: string = left === String() ?
      String()
      : new Url._Port(port).string
    const delim: string = (
      right === String()
      || right === "0"
    ) ?
      String()
      : ":";
    return [left, right]
      .join(delim)
      .trim();
  }

  static appendPathToLeft(
    left: string,
    path: (string
      | Path
    )
  ): string {
    left = left.trim();
    const right: string = new Url._Path(path).string;
    const delim: string = String();
    return [left, right]
      .join(delim)
      .trim();
  }

  static appendQueryToLeft(
    left: string,
    query: (string
      | Query
    )
  ): string {
    left = left.trim();
    const right: string = new Url._Query(query).string;
    const delim: string = right === String() ?
      String()
      : "?";
    return [left, right]
      .join(delim)
      .trim();
  }

  static appendFragmentToLeft(
    left: string,
    fragment: (string
      | Fragment
    )
  ): string {
    left = left.trim();
    const right: string = new Url._Fragment(fragment).string;
    const delim = right === String() ?
      String()
      : "#";
    return [left, right]
      .join(delim)
      .trim();
  }

  static encode(
    url: string
  ): string {
    return encodeURI(url.trim())
      ?.trim()
      ?? String();
  }

  static decode(
    url: string
  ): string {
    return decodeURI(url.trim())
      ?.trim()
      ?? String();
  }

  static encodePart(
    part: string
  ): string {
    return encodeURIComponent(
      part.trim()
    )
      ?.trim()
      ?? String();
  }

  static decodePart(
    part: string
  ): string {
    return decodeURIComponent(
      part.trim()
    )
      ?.trim()
      ?? String();
  }
}

namespace Url {
  export interface UrlParts {
    scheme?: string | Scheme,
    host?: string | Host,
    port?: string | number | Port,
    path?: string | Path,
    query?: string | Query,
    fragment?: string | Fragment
  };
  
  export const _Scheme: typeof Scheme = importModule("urlparts/Scheme");
  export const _Host: typeof Host = importModule("urlparts/Host");
  export const _Port: typeof Port = importModule("urlparts/Port");
  export const _Path: typeof Path = importModule("urlparts/Path");
  export const _Query: typeof Query = importModule("urlparts/Query");
  export const _Fragment: typeof Fragment = importModule("urlparts/Fragment");
}

module.exports = Url;

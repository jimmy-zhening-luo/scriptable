class Url {
  #scheme: Scheme = new Url._Scheme();
  #host: Host = new Url._Host();
  #port: Port = new Url._Port();
  #path: Path = new Url._Path();
  #query: Query = new Url._Query();
  #fragment: Fragment = new Url._Fragment();

  constructor();
  constructor(url: Url);
  constructor(urlparts: Url.UrlParts);
  constructor(url: string);
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
      this.scheme = undefined;
      this.host = undefined;
      this.port = undefined;
      this.path = undefined;
      this.query = undefined;
      this.fragment = undefined;
    }
    else if (head instanceof Url) {
      const url: Url = head;
      this.scheme = url.scheme;
      this.host = url.host;
      this.port = url.port;
      this.path = url.path;
      this.query = url.query;
      this.fragment = url.fragment;
    }
    else if (typeof head === "string") {
      if (host === undefined) {
        const url: string = head;
        const parsedUrl: Url = parse(url);
        this.scheme = parsedUrl.scheme;
        this.host = parsedUrl.host;
        this.port = parsedUrl.port;
        this.path = parsedUrl.path;
        this.query = parsedUrl.query;
        this.fragment = parsedUrl.fragment;
      }
      else {
        const scheme: string = head;
        this.scheme = scheme;
        this.host = host;
        this.port = port;
        this.path = path;
        this.query = query;
        this.fragment = fragment;
      }
    }
    else if (
      "part" in head
      && "string" in head
      && "hasValue" in head
    ) {
      if (host === undefined) {
        this.scheme = undefined;
        this.host = undefined;
        this.port = undefined;
        this.path = undefined;
        this.query = undefined;
        this.fragment = undefined;
      }
      else {
        const scheme: Scheme = head;
        this.scheme = scheme;
        this.host = host;
        this.port = port;
        this.path = path;
        this.query = query;
        this.fragment = fragment;
      }
    }
    else {
      const urlParts: Url.UrlParts = head;
      this.scheme = urlParts.scheme;
      this.host = urlParts.host;
      this.port = urlParts.port;
      this.path = urlParts.path;
      this.query = urlParts.query;
      this.fragment = urlParts.fragment;
    }

    function parse(url: string): Url {

      let urlStringParts: Url.UrlParts = { };

      const url_fragment: string[] = url
        .trim()
        .split("#");
      url = url_fragment.shift();
      urlStringParts.fragment = url_fragment.join("#");

      const queryOrSchemehostportpath_query: string[] = url.split("?");
      const queryOrSchemehostportpath: string = queryOrSchemehostportpath_query.shift();
      const schemehostpath: string = queryOrSchemehostportpath.includes("=") ?
        ""
        : queryOrSchemehostportpath;
      urlStringParts.query = queryOrSchemehostportpath.includes("=") ?
        [
          queryOrSchemehostportpath,
          ...queryOrSchemehostportpath_query
        ].join("?")
        : queryOrSchemehostportpath_query.join("?");

      const scheme_hostportpath: string[] = schemehostportpath.split("://");
      const schemeOrHostportpath: string = scheme_hostportpath.shift();
      urlStringParts.scheme = scheme_hostportpath.length > 0 ?
        schemeOrHostportpath
        : (schemeOrHostportpath.includes(".")
          || schemeOrHostportpath.includes("/")) ?
          ""
          : schemeOrHostportpath;
      const hostportpath: string = scheme_hostportpath.length > 0 ?
        scheme_hostportpath.join("://")
        : urlStringParts.scheme === "" ?
          schemeOrHostportpath
          : "";

      const hostport_path: string[] = Url._File
        .trimPath(hostportpath)
        .split("/");
      const hostport: string = hostport_path.shift();
      urlStringParts.path = hostport_path.join("/");

      const host_port: string[] =
        hostport.split(":");
      urlStringParts.host = host_port.shift();
      urlStringParts.port = urlStringParts.host === "" ?
        ""
        : host_port.join(":");

      return new Url(urlStringParts);
    }
  }

  get scheme(): string {
    return this.#scheme.hasValue ?
      this.#scheme.toString()
      : "https";
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

  get host(): string {
    return this.#host.toString();
  }

  set host(
    host: (string
      | Host
      | undefined
    )
  ) {
    this.#host = new Url._Host(host);
  }

  get port(): string {
    return this.#port.toString();
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

  get path(): string {
    return this.#path.toString();
  }

  set path(
    path: (string
      | Path
      | undefined
    )
  ) {
    this.#path = new Url._Path(path);
  }

  get query(): string {
    return this.#query.toString();
  }

  set query(
    query: (string
      | Query
      | undefined
    )
  ) {
    this.#query = new Url._Query(query);
  }

  get fragment(): string {
    return this.#fragment.toString();
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
    return this.joinedUrlParts;
  }

  toString(): string {
    return this.string;
  }

  private get joinedUrlParts(): string {


    const hostPort: string = this.host === "" ?
      ""
      : this.port === "" ?
        this.host
        : [this.host, this.port]
          .join(":");
    const schemeHostPort: string = this.scheme === "" ?
      hostPort === "" ?
        ""
        : ["https", hostPort].join("://")
      : [this.scheme, hostPort].join("://");

    const pathQuery: string = this.query === "" ?
      this.path
      : [this.path, this.query].join("?");
    const pathQueryFragment: string = this.fragment === "" ?
      pathQuery
      : [pathQuery, this.fragment].join("#");

    return schemeHostPort === "" ?
      ""
      : pathQueryFragment === "" ?
        schemeHostPort
        : [schemeHostPort, pathQueryFragment].join("/");
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

  export const _File: typeof File = importModule("./shortcut/application/appdata/filesystem/file/File");

  export const _Scheme: typeof Scheme = importModule("urlparts/Scheme");
  export const _Host: typeof Host = importModule("urlparts/Host");
  export const _Port: typeof Port = importModule("urlparts/Port");
  export const _Path: typeof Path = importModule("urlparts/Path");
  export const _Query: typeof Query = importModule("urlparts/Query");
  export const _Fragment: typeof Fragment = importModule("urlparts/Fragment");
}

module.exports = Url;

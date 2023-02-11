class Url {
  #scheme: Scheme = new Url.Scheme("https");
  #host: Host = new Url.Host();
  #port: Port = new Url.Port();
  #path: Path = new Url.Path();
  #query: Query = new Url.Query();
  #fragment: Fragment = new Url.Fragment();

  constructor(url?: string | Url | Url.UrlParts);
  constructor(
    scheme?: string | Scheme,
    host?: string | Host,
    port?: string | number | Port,
    path?: string | Path,
    query?:
      | string
      | Query
      | Record<string, string>
      | [string, string]
      | [string, string][],
    fragment?: string | Fragment
  );

  constructor(
    head?:
      | string
      | Scheme
      | Url
      | Url.UrlParts,
    host?: string | Host,
    port?: string | number | Port,
    path?: string | Path,
    query?:
      | string
      | Query
      | Record<string, string>
      | [string, string]
      | [string, string][],
    fragment?: string | Fragment
  ) {
    if (head === undefined) { }
    else if (
      head instanceof UrlPart
      || typeof head === "string"
      && host !== undefined
    ) {
      const scheme: string | Scheme = head;
      this.scheme = scheme;
      this.host = host;
      this.port = port;
      this.path = path;
      this.query = query;
      this.fragment = fragment;
    }
    else {
      const url: string | Url | Url.UrlParts = head;
      this.url = url;
    }
  }

  get url(): string {
    return this.isValid ?
      new Url._SchemeHostPortPathQueryFragment([
        this.#scheme,
        this.#host,
        this.#port,
        this.#path,
        this.#query,
        this.#fragment
      ]).toString()
      : "";
  }

  set url(url:
    | null | undefined
    | string
    | Url
    | Url.UrlParts
  ) {
    if (
      url === undefined
      || url === null
    ) { }
    else if (typeof url === "string") {
      const parsedUrl: Url = this.parse(url);
      this.scheme = parsedUrl.scheme;
      this.host = parsedUrl.host;
      this.port = parsedUrl.port;
      this.path = parsedUrl.path;
      this.query = parsedUrl.query;
      this.fragment = parsedUrl.fragment;
    }
    else {
      this.scheme = url.scheme;
      this.host = url.host;
      this.port = url.port;
      this.path = url.path;
      this.query = url.query;
      this.fragment = url.fragment;
    }
  }

  get scheme(): string {
    return this.#scheme.toString();
  }

  set scheme(
    scheme: (
      | null | undefined
      | string
      | Scheme
    )
  ) {
    this.#scheme = new Url.Scheme(
      scheme
    );
    if (this.scheme === "")
      this.#scheme = new Url.Scheme(
        "https"
      );
  }

  get host(): string {
    return this.#host.toString();
  }

  set host(
    host: (
      | null | undefined
      | string
      | Host
    )
  ) {
    this.#host = new Url.Host(host);
  }

  get port(): string {
    return this.#port.toString();
  }

  set port(
    port: (
      | null | undefined
      | string
      | number
      | Port
    )
  ) {
    this.#port = new Url.Port(port);
  }

  get path(): string {
    return this.#path.toString();
  }

  set path(
    path: (
      | null | undefined
      | string
      | Path
    )
  ) {
    this.#path = new Url.Path(path);
  }

  get query(): string {
    return this.queryString;
  }

  get queryString(): string {
    return this.#query.toString();
  }

  get queryTuples(): typeof Query.prototype.queryTuples {
    return this.#query.toTuples();
  }

  get queryMap(): typeof Query.prototype.queryMap {
    return this.#query.toMap();
  }

  set query(
    query: (
      | null | undefined
      | string
      | Query
      | Map<Types.stringful, string>
      | Record<Types.stringful, string>
      | [Types.stringful, string]
      | [Types.stringful, string][]
    )
  ) {
    this.#query = new Url.Query(query);
  }

  addParam(
    keyOrKeyValue:
      | string
      | Map<Types.stringful, string>
      | Record<Types.stringful, string>
      | [Types.stringful, string]
      | [Types.stringful, string][],
    value?: string
  ): this {
    this.query = this.#query.addParam(keyOrKeyValue, value);
    return this;
  }

  deleteParam(
    key:
      | Types.stringful
      | Types.stringful[]
  ): this {
    Array.isArray(key) ?
      key.forEach((key) => {
        this.addParam(key, "");
      })
      : this.addParam(key, "");
    return this;
  }

  get fragment(): string {
    return this.#fragment.toString();
  }

  set fragment(
    fragment: (
      | null | undefined
      | string
      | Fragment
    )
  ) {
    this.#fragment = new Url.Fragment(
      fragment
    );
  }

  open(): this {
    Safari.open(this.url);
    return this;
  }

  webview(fullScreen: boolean = false): this {
    WebView.loadURL(
      this.url,
      undefined,
      fullScreen
    );
    return this;
  }

  xCallback(): any {
    const baseUrl = new Url(this);
    baseUrl.query = "";
    baseUrl.fragment = "";
    const callbackUrl = new CallbackURL(
      baseUrl.toString()
    );
    Array.from(
      this
        .#query
        .queryMap
        .entries()
    ).forEach(([key, value]) => {
      callbackUrl.addParameter(
        key,
        value
      );
    });
    var response: Record<string, Types.primitive | null> = {};
    callbackUrl
      .open()
      .then((_response) => {
        response = _response ?? "";
      });
    return response;
  }

  get isValid(): boolean {
    return this.#scheme.isValid;
  }

  private parse(url: string): Url {
    let urlStringParts: Url.UrlParts = {};

    const url_fragment: string[] = url
      .trim()
      .split("#");
    url = url_fragment.shift() ?? "";
    urlStringParts.fragment = url_fragment.join("#");

    const queryOrSchemehostportpath_query: string[] = url.split("?");
    const queryOrSchemehostportpath: string = queryOrSchemehostportpath_query.shift() ?? "";
    const schemehostportpath: string = queryOrSchemehostportpath.includes("=") ?
      ""
      : queryOrSchemehostportpath;
    urlStringParts.query = queryOrSchemehostportpath.includes("=") ?
      [
        queryOrSchemehostportpath,
        ...queryOrSchemehostportpath_query
      ].join("?")
      : queryOrSchemehostportpath_query.join("?");

    const scheme_hostportpath: string[] = schemehostportpath.split("://");
    const schemeOrHostportpath: string = scheme_hostportpath.shift() ?? "";
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

    const hostport_path: string[] = Url.Paths
      .trimPath(hostportpath)
      .split("/");
    const hostport: string = hostport_path.shift() ?? "";
    urlStringParts.path = hostport_path.join("/");

    const host_port: string[] =
      hostport.split(":");
    urlStringParts.host = host_port.shift() ?? "";
    urlStringParts.port = urlStringParts.host === "" ?
      ""
      : host_port.join(":");

    return new Url(urlStringParts);
  }

  toString(): string {
    return this.url;
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

  get Scheme(): typeof Scheme {
    return Url.Scheme;
  }

  get Host(): typeof Host {
    return Url.Host;
  }

  get Port(): typeof Port {
    return Url.Port;
  }

  get Path(): typeof Path {
    return Url.Path;
  }

  get Query(): typeof Query {
    return Url.Query;
  }

  get Fragment(): typeof Fragment {
    return Url.Fragment;
  }

  static get Scheme(): typeof Scheme {
    return importModule("urlcomposites/urlparts/Scheme");
  }

  static get Host(): typeof Host {
    return importModule("urlcomposites/urlparts/Host");
  }

  static get Port(): typeof Port {
    return importModule("urlcomposites/urlparts/Port");
  }

  static get Path(): typeof Path {
    return importModule("urlcomposites/urlparts/Path");
  }

  static get Query(): typeof Query {
    return importModule("urlcomposites/urlparts/Query");
  }

  static get Fragment(): typeof Fragment {
    return importModule("urlcomposites/urlparts/Fragment");
  }

  static get Paths(): typeof Paths {
    return Url.Scheme.Paths;
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

  export const _SchemeHostPortPathQueryFragment: typeof SchemeHostPortPathQueryFragment = importModule("urlcomposites/SchemeHostPortPathQueryFragment");

}

module.exports = Url;

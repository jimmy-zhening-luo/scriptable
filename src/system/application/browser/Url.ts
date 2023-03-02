class Url {
  private _scheme: Scheme = new Url.Scheme("https");
  private _host: Host = new Url.Host();
  private _port: Port = new Url.Port();
  private _path: Path = new Url.Path();
  private _query: Query = new Url.Query();
  private _fragment: Fragment = new Url.Fragment();

  constructor(
    headOrScheme?: null | string | Scheme | Url | Url.UrlParts,
    host?: ConstructorParameters<typeof Host>[0],
    port?: ConstructorParameters<typeof Port>[0],
    path?: ConstructorParameters<typeof Path>[0],
    query?: ConstructorParameters<typeof Query>[0],
    fragment?: ConstructorParameters<typeof Fragment>[0],
  ) {
    if (headOrScheme === undefined || headOrScheme === null) {
    } else if (
      headOrScheme instanceof UrlPart ||
      (typeof headOrScheme === "string" && host !== undefined)
    ) {
      const scheme: string | Scheme = headOrScheme;
      this.scheme = scheme;
      this.host = host;
      this.port = port;
      this.path = path;
      this.query = query;
      this.fragment = fragment;
    } else {
      const url: string | Url | Url.UrlParts = headOrScheme;
      this.url = url;
    }
  }

  get url(): string {
    return this.isValid
      ? new this.SchemeHostPortPathQueryFragment([
          this._scheme,
          this._host,
          this._port,
          this._path,
          this._query,
          this._fragment,
        ]).toString()
      : "";
  }

  set url(url: ConstructorParameters<typeof Url>[0]) {
    if (url === undefined || url === null) {
    } else if (typeof url === "string") {
      const parsedUrl: Url = this.parse(url);
      this.scheme = parsedUrl.scheme;
      this.host = parsedUrl.host;
      this.port = parsedUrl.port;
      this.path = parsedUrl.path;
      this.query = parsedUrl.query;
      this.fragment = parsedUrl.fragment;
    } else if (url instanceof Scheme) {
      const scheme: Scheme = url;
      this.url = "";
      this.url = scheme.toString();
    } else {
      this.scheme = url.scheme;
      this.host = url.host;
      this.port = url.port;
      this.path = url.path;
      this.query = url.query;
      this.fragment = url.fragment;
    }
  }

  get scheme(): string {
    return this._scheme.toString();
  }

  set scheme(scheme: ConstructorParameters<typeof Scheme>[0]) {
    this._scheme = new Url.Scheme(scheme);
    if (this.scheme === "") this._scheme = new Url.Scheme("https");
  }

  get host(): string {
    return this._host.toString();
  }

  set host(host: ConstructorParameters<typeof Host>[0]) {
    this._host = new Url.Host(host);
  }

  get port(): string {
    return this._port.toString();
  }

  set port(port: ConstructorParameters<typeof Port>[0]) {
    this._port = new Url.Port(port);
  }

  get path(): string {
    return this._path.toString();
  }

  set path(path: ConstructorParameters<typeof Path>[0]) {
    this._path = new Url.Path(path);
  }

  append(...path: Parameters<Path["append"]>): this {
    this.path = this._path.append(...path);
    return this;
  }

  get query(): typeof Query.prototype.query {
    return this.queryString;
  }

  get queryString(): typeof Query.prototype.queryString {
    return this._query.toString();
  }

  get queryTuples(): typeof Query.prototype.queryTuples {
    return this._query.toTuples();
  }

  get queryMap(): typeof Query.prototype.queryMap {
    return this._query.toMap();
  }

  set query(query: ConstructorParameters<typeof Query>[0]) {
    this._query = new Url.Query(query);
  }

  hasParam(...key: Parameters<Query["hasParam"]>): boolean {
    return this._query.hasParam(...key);
  }

  getParam(...key: Parameters<Query["getParam"]>): string {
    return this._query.getParam(...key);
  }

  addParam(...params: Parameters<Query["addParam"]>): this {
    this.query = this._query.addParam(...params);
    return this;
  }

  deleteParam(...keys: Parameters<Query["deleteParam"]>): this {
    this.query = this._query.deleteParam(...keys);
    return this;
  }

  get fragment(): string {
    return this._fragment.toString();
  }

  set fragment(fragment: ConstructorParameters<typeof Fragment>[0]) {
    this._fragment = new Url.Fragment(fragment);
  }

  open(): this {
    Safari.open(this.url);
    return this;
  }

  webview(fullScreen: boolean = false): this {
    WebView.loadURL(this.url, undefined, fullScreen);
    return this;
  }

  xCallback(): any {
    const baseUrl = new Url(this);
    baseUrl.query = "";
    baseUrl.fragment = "";
    const callbackUrl = new CallbackURL(baseUrl.toString());
    Array.from(this._query.queryMap.entries()).forEach(([key, value]) => {
      callbackUrl.addParameter(key, value);
    });
    var response: Record<string, primitive | null> = {};
    callbackUrl.open().then(_response => {
      response = _response;
    });
    return response;
  }

  get isValid(): boolean {
    return this._scheme.isValid;
  }

  private parse(url: string): Url {
    let urlStringParts: Url.UrlParts = {};

    const url_fragment: string[] = url.trim().split("#");
    url = url_fragment.shift() ?? "";
    urlStringParts.fragment = url_fragment.join("#");

    const queryOrSchemehostportpath_query: string[] = url.split("?");
    const queryOrSchemehostportpath: string =
      queryOrSchemehostportpath_query.shift() ?? "";
    const schemehostportpath: string = queryOrSchemehostportpath.includes("=")
      ? ""
      : queryOrSchemehostportpath;
    urlStringParts.query = queryOrSchemehostportpath.includes("=")
      ? [queryOrSchemehostportpath, ...queryOrSchemehostportpath_query].join(
          "?",
        )
      : queryOrSchemehostportpath_query.join("?");

    const scheme_hostportpath: string[] = schemehostportpath.split("://");
    const schemeOrHostportpath: string = scheme_hostportpath.shift() ?? "";
    urlStringParts.scheme =
      scheme_hostportpath.length > 0
        ? schemeOrHostportpath
        : schemeOrHostportpath.includes(".") ||
          schemeOrHostportpath.includes("/")
        ? ""
        : schemeOrHostportpath;
    const hostportpath: string =
      scheme_hostportpath.length > 0
        ? scheme_hostportpath.join("://")
        : urlStringParts.scheme === ""
        ? schemeOrHostportpath
        : "";

    const hostport_path: string[] = hostportpath.split("/");
    const hostport: string = hostport_path.shift() ?? "";
    urlStringParts.path = hostport_path.join("/");

    const host_port: string[] = hostport.split(":");
    urlStringParts.host = host_port.shift() ?? "";
    urlStringParts.port = urlStringParts.host === "" ? "" : host_port.join(":");

    return new Url(urlStringParts);
  }

  toString(): string {
    return this.url;
  }

  static encode(url: string): string {
    return encodeURI(url.trim()).trim();
  }

  static decode(url: string): string {
    return decodeURI(url.trim()).trim();
  }

  static encodePart(part: string): string {
    return encodeURIComponent(part.trim()).trim();
  }

  static decodePart(part: string): string {
    return decodeURIComponent(part.trim()).trim();
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

  private get SchemeHostPortPathQueryFragment(): typeof SchemeHostPortPathQueryFragment {
    return Url.UrlComposites.SchemeHostPortPathQueryFragment;
  }

  static get UrlComposites(): typeof UrlComposites {
    return importModule("urlcomposites/UrlComposites");
  }

  static get UrlParts(): typeof UrlParts {
    return Url.UrlComposites.UrlComposite.UrlParts;
  }

  static get Scheme(): typeof Scheme {
    return Url.UrlParts.Scheme;
  }

  static get Host(): typeof Host {
    return Url.UrlParts.Host;
  }

  static get Port(): typeof Port {
    return Url.UrlParts.Port;
  }

  static get Path(): typeof Path {
    return Url.UrlParts.Path;
  }

  static get Query(): typeof Query {
    return Url.UrlParts.Query;
  }

  static get Fragment(): typeof Fragment {
    return Url.UrlParts.Fragment;
  }
}

namespace Url {
  export interface UrlParts {
    scheme?: ConstructorParameters<typeof Scheme>[0];
    host?: ConstructorParameters<typeof Host>[0];
    port?: ConstructorParameters<typeof Port>[0];
    path?: ConstructorParameters<typeof Path>[0];
    query?: ConstructorParameters<typeof Query>[0];
    fragment?: ConstructorParameters<typeof Fragment>[0];
  }
}

module.exports = Url;

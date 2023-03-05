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
    try {
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
    } catch (e) {
      throw new Error(`Url: constructor: error creating Url: ${e}`);
    }
  }

  get url(): string {
    try {
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
    } catch (e) {
      throw new Error(`Url: get url: error getting url: ${e}`);
    }
  }

  set url(url: ConstructorParameters<typeof Url>[0]) {
    try {
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
    } catch (e) {
      throw new Error(`Url: set url: error setting url: ${e}`);
    }
  }

  get scheme(): string {
    try {
      return this._scheme.toString();
    } catch (e) {
      throw new Error(`Url: get scheme: error getting scheme: ${e}`);
    }
  }

  set scheme(scheme: ConstructorParameters<typeof Scheme>[0]) {
    try {
      this._scheme = new Url.Scheme(scheme);
      if (this.scheme === "") this._scheme = new Url.Scheme("https");
    } catch (e) {
      throw new Error(`Url: set scheme: error setting scheme: ${e}`);
    }
  }

  get host(): string {
    try {
      return this._host.toString();
    } catch (e) {
      throw new Error(`Url: get host: error getting host: ${e}`);
    }
  }

  set host(host: ConstructorParameters<typeof Host>[0]) {
    try {
      this._host = new Url.Host(host);
    } catch (e) {
      throw new Error(`Url: set host: error setting host: ${e}`);
    }
  }

  get port(): string {
    try {
      return this._port.toString();
    } catch (e) {
      throw new Error(`Url: get port: error getting port: ${e}`);
    }
  }

  set port(port: ConstructorParameters<typeof Port>[0]) {
    try {
      this._port = new Url.Port(port);
    } catch (e) {
      throw new Error(`Url: set port: error setting port: ${e}`);
    }
  }

  get path(): string {
    try {
      return this._path.toString();
    } catch (e) {
      throw new Error(`Url: get path: error getting path: ${e}`);
    }
  }

  set path(path: ConstructorParameters<typeof Path>[0]) {
    try {
      this._path = new Url.Path(path);
    } catch (e) {
      throw new Error(`Url: set path: error setting path: ${e}`);
    }
  }

  append(...path: Parameters<Path["append"]>): this {
    try {
      this.path = this._path.append(...path);
      return this;
    } catch (e) {
      throw new Error(`Url: append: error appending path: ${e}`);
    }
  }

  get query(): typeof Query.prototype.query {
    try {
      return this.queryString;
    } catch (e) {
      throw new Error(`Url: get query: error getting query: ${e}`);
    }
  }

  get queryString(): typeof Query.prototype.queryString {
    try {
      return this._query.toString();
    } catch (e) {
      throw new Error(`Url: get queryString: error getting queryString: ${e}`);
    }
  }

  get queryTuples(): typeof Query.prototype.queryTuples {
    try {
      return this._query.toTuples();
    } catch (e) {
      throw new Error(`Url: get queryTuples: error getting queryTuples: ${e}`);
    }
  }

  get queryMap(): typeof Query.prototype.queryMap {
    try {
      return this._query.toMap();
    } catch (e) {
      throw new Error(`Url: get queryMap: error getting queryMap: ${e}`);
    }
  }

  set query(query: ConstructorParameters<typeof Query>[0]) {
    try {
      this._query = new Url.Query(query);
    } catch (e) {
      throw new Error(`Url: set query: error setting query: ${e}`);
    }
  }

  hasParam(...key: Parameters<Query["hasParam"]>): boolean {
    try {
      return this._query.hasParam(...key);
    } catch (e) {
      throw new Error(`Url: hasParam: error checking if query has param: ${e}`);
    }
  }

  getParam(...key: Parameters<Query["getParam"]>): string {
    try {
      return this._query.getParam(...key);
    } catch (e) {
      throw new Error(`Url: getParam: error getting param: ${e}`);
    }
  }

  addParam(...params: Parameters<Query["addParam"]>): this {
    try {
      this.query = this._query.addParam(...params);
      return this;
    } catch (e) {
      throw new Error(`Url: addParam: error adding param: ${e}`);
    }
  }

  deleteParam(...keys: Parameters<Query["deleteParam"]>): this {
    try {
      this.query = this._query.deleteParam(...keys);
      return this;
    } catch (e) {
      throw new Error(`Url: deleteParam: error deleting param: ${e}`);
    }
  }

  get fragment(): string {
    try {
      return this._fragment.toString();
    } catch (e) {
      throw new Error(`Url: get fragment: error getting fragment: ${e}`);
    }
  }

  set fragment(fragment: ConstructorParameters<typeof Fragment>[0]) {
    try {
      this._fragment = new Url.Fragment(fragment);
    } catch (e) {
      throw new Error(`Url: set fragment: error setting fragment: ${e}`);
    }
  }

  open(): this {
    try {
      Safari.open(this.url);
      return this;
    } catch (e) {
      throw new Error(`Url: open: error opening url: ${e}`);
    }
  }

  webview(fullScreen: boolean = false): this {
    try {
      WebView.loadURL(this.url, undefined, fullScreen);
      return this;
    } catch (e) {
      throw new Error(`Url: webview: error opening url: ${e}`);
    }
  }

  xCallback(): any {
    try {
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
    } catch (e) {
      throw new Error(`Url: xCallback: error opening url: ${e}`);
    }
  }

  get isValid(): boolean {
    try {
      return this._scheme.isValid;
    } catch (e) {
      throw new Error(`Url: isValid: error checking validity: ${e}`);
    }
  }

  private parse(url: string): Url {
    try {
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
      urlStringParts.port =
        urlStringParts.host === "" ? "" : host_port.join(":");

      return new Url(urlStringParts);
    } catch (e) {
      throw new Error(`Url: parse: error parsing url: ${e}`);
    }
  }

  toString(): string {
    try {
      return this.url;
    } catch (e) {
      throw new Error(`Url: toString: error getting url: ${e}`);
    }
  }

  static encode(url: string): string {
    try {
      return encodeURI(url.trim()).trim();
    } catch (e) {
      throw new Error(`Url: encode: error encoding url: ${e}`);
    }
  }

  static decode(url: string): string {
    try {
      return decodeURI(url.trim()).trim();
    } catch (e) {
      throw new Error(`Url: decode: error decoding url: ${e}`);
    }
  }

  static encodePart(part: string): string {
    try {
      return encodeURIComponent(part.trim()).trim();
    } catch (e) {
      throw new Error(`Url: encodePart: error encoding part: ${e}`);
    }
  }

  static decodePart(part: string): string {
    try {
      return decodeURIComponent(part.trim()).trim();
    } catch (e) {
      throw new Error(`Url: decodePart: error decoding part: ${e}`);
    }
  }

  get Scheme(): typeof Scheme {
    try {
      return Url.Scheme;
    } catch (e) {
      throw new ReferenceError(`Url: get Scheme: error getting scheme: ${e}`);
    }
  }

  get Host(): typeof Host {
    try {
      return Url.Host;
    } catch (e) {
      throw new ReferenceError(`Url: get Host: error getting host: ${e}`);
    }
  }

  get Port(): typeof Port {
    try {
      return Url.Port;
    } catch (e) {
      throw new ReferenceError(`Url: get Port: error getting port: ${e}`);
    }
  }

  get Path(): typeof Path {
    try {
      return Url.Path;
    } catch (e) {
      throw new ReferenceError(`Url: get Path: error getting path: ${e}`);
    }
  }

  get Query(): typeof Query {
    try {
      return Url.Query;
    } catch (e) {
      throw new ReferenceError(`Url: get Query: error getting query: ${e}`);
    }
  }

  get Fragment(): typeof Fragment {
    try {
      return Url.Fragment;
    } catch (e) {
      throw new ReferenceError(
        `Url: get Fragment: error getting fragment: ${e}`,
      );
    }
  }

  private get SchemeHostPortPathQueryFragment(): typeof SchemeHostPortPathQueryFragment {
    try {
      return Url.UrlComposites.SchemeHostPortPathQueryFragment;
    } catch (e) {
      throw new ReferenceError(
        `Url: get SchemeHostPortPathQueryFragment: error getting scheme host port path query fragment: ${e}`,
      );
    }
  }

  static get UrlComposites(): typeof UrlComposites {
    try {
      return importModule("urlcomposites/UrlComposites");
    } catch (e) {
      throw new ReferenceError(
        `Url: get UrlComposites: error getting url composites: ${e}`,
      );
    }
  }

  static get UrlParts(): typeof UrlParts {
    try {
      return Url.UrlComposites.UrlComposite.UrlParts;
    } catch (e) {
      throw new ReferenceError(
        `Url: get UrlParts: error getting url parts: ${e}`,
      );
    }
  }

  static get Scheme(): typeof Scheme {
    try {
      return Url.UrlParts.Scheme;
    } catch (e) {
      throw new ReferenceError(`Url: get Scheme: error getting scheme: ${e}`);
    }
  }

  static get Host(): typeof Host {
    try {
      return Url.UrlParts.Host;
    } catch (e) {
      throw new ReferenceError(`Url: get Host: error getting host: ${e}`);
    }
  }

  static get Port(): typeof Port {
    try {
      return Url.UrlParts.Port;
    } catch (e) {
      throw new ReferenceError(`Url: get Port: error getting port: ${e}`);
    }
  }

  static get Path(): typeof Path {
    try {
      return Url.UrlParts.Path;
    } catch (e) {
      throw new ReferenceError(`Url: get Path: error getting path: ${e}`);
    }
  }

  static get Query(): typeof Query {
    try {
      return Url.UrlParts.Query;
    } catch (e) {
      throw new ReferenceError(`Url: get Query: error getting query: ${e}`);
    }
  }

  static get Fragment(): typeof Fragment {
    try {
      return Url.UrlParts.Fragment;
    } catch (e) {
      throw new ReferenceError(
        `Url: get Fragment: error getting fragment: ${e}`,
      );
    }
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

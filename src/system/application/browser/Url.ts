class Url {
  private _scheme: Scheme = new Url.Scheme("https");
  private _host: Host = new Url.Host();
  private _port: Port = new Url.Port();
  private _path: Path = new Url.Path();
  private _query: Query = new Url.Query();
  private _fragment: Fragment = new Url.Fragment();

  constructor(
    headUrl: string | Scheme | Url | Url.UrlRecords = "",
    host?: ConstructorParameters<typeof Host>[0],
    port?: ConstructorParameters<typeof Port>[0],
    path?: ConstructorParameters<typeof Path>[0],
    query?: ConstructorParameters<typeof Query>[0],
    fragment?: ConstructorParameters<typeof Fragment>[0],
  ) {
    try {
      if (typeof headUrl === "string") {
        if (
          host === undefined &&
          port === undefined &&
          path === undefined &&
          query === undefined &&
          fragment === undefined
        )
          this.url = headUrl;
        else {
          this.scheme = headUrl;
          this.host = host;
          this.port = port;
          this.path = path;
          this.query = query;
          this.fragment = fragment;
        }
      } else if (headUrl instanceof Url.Scheme) {
        this.scheme = headUrl;
        this.host = host;
        this.port = port;
        this.path = path;
        this.query = query;
        this.fragment = fragment;
      } else {
        this.scheme = headUrl.scheme;
        this.host = headUrl.host;
        this.port = headUrl.port;
        this.path = headUrl.path;
        this.query = headUrl.query;
        this.fragment = headUrl.fragment;
        if (host !== undefined) {
          this.host = host;
          if (port !== undefined) {
            this.port = port;
            if (path !== undefined) {
              this.path = path;
              if (query !== undefined) {
                this.query = query;
                if (fragment !== undefined) {
                  this.fragment = fragment;
                }
              }
            }
          }
        }
      }
    } catch (e) {
      throw new Error(`Url: constructor: error creating Url: \n${e}`);
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
      throw new Error(`Url: get url: error getting url: \n${e}`);
    }
  }

  set url(url: string | Url | Url.UrlRecords) {
    try {
      const parsedUrl: Url.UrlRecords = this._parse(url);
      this.scheme = parsedUrl.scheme;
      this.host = parsedUrl.host;
      this.port = parsedUrl.port;
      this.path = parsedUrl.path;
      this.query = parsedUrl.query;
      this.fragment = parsedUrl.fragment;
    } catch (e) {
      throw new Error(`Url: set url: error setting url: \n${e}`);
    }
  }

  get scheme(): string {
    try {
      return this._scheme.toString();
    } catch (e) {
      throw new Error(`Url: get scheme: error getting scheme: \n${e}`);
    }
  }

  set scheme(scheme: ConstructorParameters<typeof Scheme>[0]) {
    try {
      this._scheme = new Url.Scheme(scheme);
      if (this.scheme === "") this._scheme = new Url.Scheme("https");
    } catch (e) {
      throw new Error(`Url: set scheme: error setting scheme: \n${e}`);
    }
  }

  get host(): string {
    try {
      return this._host.toString();
    } catch (e) {
      throw new Error(`Url: get host: error getting host: \n${e}`);
    }
  }

  set host(host: ConstructorParameters<typeof Host>[0]) {
    try {
      this._host = new Url.Host(host);
    } catch (e) {
      throw new Error(`Url: set host: error setting host: \n${e}`);
    }
  }

  get port(): string {
    try {
      return this._port.toString();
    } catch (e) {
      throw new Error(`Url: get port: error getting port: \n${e}`);
    }
  }

  set port(port: ConstructorParameters<typeof Port>[0]) {
    try {
      this._port = new Url.Port(port);
    } catch (e) {
      throw new Error(`Url: set port: error setting port: \n${e}`);
    }
  }

  get path(): string {
    try {
      return this._path.toString();
    } catch (e) {
      throw new Error(`Url: get path: error getting path: \n${e}`);
    }
  }

  set path(path: ConstructorParameters<typeof Path>[0]) {
    try {
      this._path = new Url.Path(path);
    } catch (e) {
      throw new Error(`Url: set path: error setting path: \n${e}`);
    }
  }

  append(...path: Parameters<Path["append"]>): this {
    try {
      this.path = this._path.append(...path);
      return this;
    } catch (e) {
      throw new Error(`Url: append: error appending path: \n${e}`);
    }
  }

  get query(): typeof Query.prototype.query {
    try {
      return this.queryString;
    } catch (e) {
      throw new Error(`Url: get query: error getting query: \n${e}`);
    }
  }

  get queryString(): typeof Query.prototype.queryString {
    try {
      return this._query.toString();
    } catch (e) {
      throw new Error(
        `Url: get queryString: error getting queryString: \n${e}`,
      );
    }
  }

  get queryTuples(): typeof Query.prototype.queryTuples {
    try {
      return this._query.toTuples();
    } catch (e) {
      throw new Error(
        `Url: get queryTuples: error getting queryTuples: \n${e}`,
      );
    }
  }

  get queryMap(): typeof Query.prototype.queryMap {
    try {
      return this._query.toMap();
    } catch (e) {
      throw new Error(`Url: get queryMap: error getting queryMap: \n${e}`);
    }
  }

  set query(query: ConstructorParameters<typeof Query>[0]) {
    try {
      this._query = new Url.Query(query);
    } catch (e) {
      throw new Error(`Url: set query: error setting query: \n${e}`);
    }
  }

  hasParam(...key: Parameters<Query["hasParam"]>): boolean {
    try {
      return this._query.hasParam(...key);
    } catch (e) {
      throw new Error(
        `Url: hasParam: error checking if query has param: \n${e}`,
      );
    }
  }

  getParam(...key: Parameters<Query["getParam"]>): string {
    try {
      return this._query.getParam(...key);
    } catch (e) {
      throw new Error(`Url: getParam: error getting param: \n${e}`);
    }
  }

  addParam(...params: Parameters<Query["addParam"]>): this {
    try {
      this.query = this._query.addParam(...params);
      return this;
    } catch (e) {
      throw new Error(`Url: addParam: error adding param: \n${e}`);
    }
  }

  deleteParam(...keys: Parameters<Query["deleteParam"]>): this {
    try {
      this.query = this._query.deleteParam(...keys);
      return this;
    } catch (e) {
      throw new Error(`Url: deleteParam: error deleting param: \n${e}`);
    }
  }

  get fragment(): string {
    try {
      return this._fragment.toString();
    } catch (e) {
      throw new Error(`Url: get fragment: error getting fragment: \n${e}`);
    }
  }

  set fragment(fragment: ConstructorParameters<typeof Fragment>[0]) {
    try {
      this._fragment = new Url.Fragment(fragment);
    } catch (e) {
      throw new Error(`Url: set fragment: error setting fragment: \n${e}`);
    }
  }

  open(): this {
    try {
      Safari.open(this.url);
      return this;
    } catch (e) {
      throw new Error(`Url: open: error opening url: \n${e}`);
    }
  }

  webview(fullScreen: boolean = false): this {
    try {
      WebView.loadURL(this.url, undefined, fullScreen);
      return this;
    } catch (e) {
      throw new Error(`Url: webview: error opening url: \n${e}`);
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
      throw new Error(`Url: xCallback: error opening url: \n${e}`);
    }
  }

  get isValid(): boolean {
    try {
      return this._scheme.isValid;
    } catch (e) {
      throw new Error(`Url: isValid: error checking validity: \n${e}`);
    }
  }

  private _parse(url: string | Url | Url.UrlRecords): Url.UrlRecords {
    try {
      let urlStringParts: Url.UrlRecords = {};
      if (typeof url === "string") {
        const url_fragment: string[] = url.trim().split("#");
        const urlWithoutFragment = url_fragment.shift() ?? "";
        urlStringParts.fragment = url_fragment.join("#");

        const queryOrSchemehostportpath_query: string[] =
          urlWithoutFragment.split("?");
        const queryOrSchemehostportpath: string =
          queryOrSchemehostportpath_query.shift() ?? "";
        const schemehostportpath: string = queryOrSchemehostportpath.includes(
          "=",
        )
          ? ""
          : queryOrSchemehostportpath;
        urlStringParts.query = queryOrSchemehostportpath.includes("=")
          ? [
              queryOrSchemehostportpath,
              ...queryOrSchemehostportpath_query,
            ].join("?")
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
      } else {
        urlStringParts = {
          scheme: url.scheme,
          host: url.host,
          port: url.port,
          path: url.path,
          query: url.query,
          fragment: url.fragment,
        };
      }
      return urlStringParts;
    } catch (e) {
      throw new Error(`Url: parse: error parsing url: \n${e}`);
    }
  }

  toString(): string {
    try {
      return this.url;
    } catch (e) {
      throw new Error(`Url: toString: error getting url: \n${e}`);
    }
  }

  static encode(url: string): string {
    try {
      return encodeURI(url.trim()).trim();
    } catch (e) {
      throw new Error(`Url: encode: error encoding url: \n${e}`);
    }
  }

  static decode(url: string): string {
    try {
      return decodeURI(url.trim()).trim();
    } catch (e) {
      throw new Error(`Url: decode: error decoding url: \n${e}`);
    }
  }

  static encodePart(part: string): string {
    try {
      return encodeURIComponent(part.trim()).trim();
    } catch (e) {
      throw new Error(`Url: encodePart: error encoding part: \n${e}`);
    }
  }

  static decodePart(part: string): string {
    try {
      return decodeURIComponent(part.trim()).trim();
    } catch (e) {
      throw new Error(`Url: decodePart: error decoding part: \n${e}`);
    }
  }

  private get SchemeHostPortPathQueryFragment(): typeof SchemeHostPortPathQueryFragment {
    try {
      return Url.UrlComposites.SchemeHostPortPathQueryFragment;
    } catch (e) {
      throw new ReferenceError(
        `Url: get SchemeHostPortPathQueryFragment: error loading SchemeHostPortPathQueryFragment module: \n${e}`,
      );
    }
  }

  static get UrlComposites(): typeof UrlComposites {
    try {
      return importModule("urlcomposites/UrlComposites");
    } catch (e) {
      throw new ReferenceError(
        `Url: get UrlComposites: error loading UrlComposites module: \n${e}`,
      );
    }
  }

  static get UrlParts(): typeof UrlParts {
    try {
      return Url.UrlComposites.UrlComposite.UrlParts;
    } catch (e) {
      throw new ReferenceError(
        `Url: get UrlParts: error loading UrlParts module: \n${e}`,
      );
    }
  }

  static get UrlPart(): typeof UrlPart {
    try {
      return Url.UrlParts.UrlPart;
    } catch (e) {
      throw new ReferenceError(
        `Url: get UrlPart: error loading UrlPart module: \n${e}`,
      );
    }
  }

  static get Scheme(): typeof Scheme {
    try {
      return Url.UrlParts.Scheme;
    } catch (e) {
      throw new ReferenceError(
        `Url: get Scheme: error loading Scheme module: \n${e}`,
      );
    }
  }

  static get Host(): typeof Host {
    try {
      return Url.UrlParts.Host;
    } catch (e) {
      throw new ReferenceError(
        `Url: get Host: error loading Host module: \n${e}`,
      );
    }
  }

  static get Port(): typeof Port {
    try {
      return Url.UrlParts.Port;
    } catch (e) {
      throw new ReferenceError(
        `Url: get Port: error loading Port module: \n${e}`,
      );
    }
  }

  static get Path(): typeof Path {
    try {
      return Url.UrlParts.Path;
    } catch (e) {
      throw new ReferenceError(
        `Url: get Path: error loading Path module: \n${e}`,
      );
    }
  }

  static get Query(): typeof Query {
    try {
      return Url.UrlParts.Query;
    } catch (e) {
      throw new ReferenceError(
        `Url: get Query: error loading Query module: \n${e}`,
      );
    }
  }

  static get Fragment(): typeof Fragment {
    try {
      return Url.UrlParts.Fragment;
    } catch (e) {
      throw new ReferenceError(
        `Url: get Fragment: error loading Fragment module: \n${e}`,
      );
    }
  }
}

namespace Url {
  export interface UrlRecords {
    scheme?: ConstructorParameters<typeof Scheme>[0];
    host?: ConstructorParameters<typeof Host>[0];
    port?: ConstructorParameters<typeof Port>[0];
    path?: ConstructorParameters<typeof Path>[0];
    query?: ConstructorParameters<typeof Query>[0];
    fragment?: ConstructorParameters<typeof Fragment>[0];
  }
}

module.exports = Url;

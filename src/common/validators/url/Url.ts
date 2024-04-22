class Url {
  private _scheme: UrlScheme = new Url.UrlScheme("https");
  private _host: UrlHost = new Url.UrlHost();
  private _port: UrlPort = new Url.UrlPort();
  private _path: UrlPath = new Url.UrlPath();
  private _query: UrlQuery = new Url.UrlQuery();
  private _fragment: UrlFragment = new Url.UrlFragment();

  constructor(
    headUrl: string | UrlScheme | Url | Url.UrlRecords = "",
    host?: ConstructorParameters<typeof UrlHost>[0],
    port?: ConstructorParameters<typeof UrlPort>[0],
    path?: ConstructorParameters<typeof UrlPath>[0],
    query?: ConstructorParameters<typeof UrlQuery>[0],
    fragment?: ConstructorParameters<typeof UrlFragment>[0],
  ) {
    try {
      if (typeof headUrl === "string") {
        if (
          host === undefined
          && port === undefined
          && path === undefined
          && query === undefined
          && fragment === undefined
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
      }
      else if (headUrl instanceof Url.UrlScheme) {
        this.scheme = headUrl;

        this.host = host;

        this.port = port;

        this.path = path;

        this.query = query;

        this.fragment = fragment;
      }
      else {
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
    }
    catch (e) {
      throw new Error(`Url: constructor: error creating Url: \n${e as string}`);
    }
  }

  public static get UrlComposites(): typeof UrlComposites {
    try {
      return importModule("composites/UrlComposites") as typeof UrlComposites;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: get UrlComposites: error loading UrlComposites module`,
        { cause: e },
      );
    }
  }

  public static get UrlParts(): typeof UrlParts {
    try {
      return Url.UrlComposites.UrlComposite.UrlParts;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: get UrlParts: error loading UrlParts module`,
        { cause: e },
      );
    }
  }

  public static get UrlPart(): typeof UrlPart {
    try {
      return Url.UrlParts.UrlPart;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: get UrlPart: error loading UrlPart module`,
        { cause: e },
      );
    }
  }

  public static get UrlScheme(): typeof UrlScheme {
    try {
      return Url.UrlParts.UrlScheme;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: get UrlScheme: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlHost(): typeof UrlHost {
    try {
      return Url.UrlParts.UrlHost;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: get UrlHost: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlPort(): typeof UrlPort {
    try {
      return Url.UrlParts.UrlPort;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: get UrlPort: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlPath(): typeof UrlPath {
    try {
      return Url.UrlParts.UrlPath;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: get UrlPath: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlQuery(): typeof UrlQuery {
    try {
      return Url.UrlParts.UrlQuery;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: get UrlQuery: error loading module`,
        { cause: e },
      );
    }
  }

  public static get UrlFragment(): typeof UrlFragment {
    try {
      return Url.UrlParts.UrlFragment;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: get UrlFragment: error loading module`,
        { cause: e },
      );
    }
  }

  private static get SchemeHostPortPathQueryFragment():
  typeof SchemeHostPortPathQueryFragment {
    try {
      return Url.UrlComposites.SchemeHostPortPathQueryFragment;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: get SchemeHostPortPathQueryFragment: error loading module`,
        { cause: e },
      );
    }
  }

  public get isValid(): boolean {
    try {
      return this._scheme.isValid;
    }
    catch (e) {
      throw new Error(`Url: isValid: error checking validity: \n${e as string}`);
    }
  }

  public get url(): string {
    try {
      return this.isValid
        ? new Url.SchemeHostPortPathQueryFragment([
          this._scheme,
          this._host,
          this._port,
          this._path,
          this._query,
          this._fragment,
        ])
          .toString()
        : "";
    }
    catch (e) {
      throw new Error(`Url: get url: error getting url: \n${e as string}`);
    }
  }

  public get scheme(): string {
    try {
      return this._scheme.toString();
    }
    catch (e) {
      throw new Error(`Url: get scheme: error getting scheme: \n${e as string}`);
    }
  }

  public get host(): string {
    try {
      return this._host.toString();
    }
    catch (e) {
      throw new Error(`Url: get host: error getting host: \n${e as string}`);
    }
  }

  public get port(): string {
    try {
      return this._port.toString();
    }
    catch (e) {
      throw new Error(`Url: get port: error getting port: \n${e as string}`);
    }
  }

  public get path(): string {
    try {
      return this._path.toString();
    }
    catch (e) {
      throw new Error(`Url: get path: error getting path: \n${e as string}`);
    }
  }

  public get query(): typeof UrlQuery.prototype.query {
    try {
      return this.queryString;
    }
    catch (e) {
      throw new Error(`Url: get query: error getting query: \n${e as string}`);
    }
  }

  public get queryString(): typeof UrlQuery.prototype.queryString {
    try {
      return this._query.toString();
    }
    catch (e) {
      throw new Error(
        `Url: get queryString: error getting queryString`,
        { cause: e },
      );
    }
  }

  public get queryTuples(): typeof UrlQuery.prototype.queryTuples {
    try {
      return this._query.toTuples();
    }
    catch (e) {
      throw new Error(
        `Url: get queryTuples: error getting queryTuples`,
        { cause: e },
      );
    }
  }

  public get queryMap(): typeof UrlQuery.prototype.queryMap {
    try {
      return this._query.toMap();
    }
    catch (e) {
      throw new Error(`Url: get queryMap: error getting queryMap: \n${e as string}`);
    }
  }

  public get fragment(): string {
    try {
      return this._fragment.toString();
    }
    catch (e) {
      throw new Error(`Url: get fragment: error getting fragment: \n${e as string}`);
    }
  }

  public set url(url: string | Url | Url.UrlRecords) {
    try {
      const parsedUrl: Url.UrlRecords = this._parse(url);

      this.scheme = parsedUrl.scheme;

      this.host = parsedUrl.host;

      this.port = parsedUrl.port;

      this.path = parsedUrl.path;

      this.query = parsedUrl.query;

      this.fragment = parsedUrl.fragment;
    }
    catch (e) {
      throw new Error(`Url: set url: error setting url: \n${e as string}`);
    }
  }

  public set scheme(scheme: ConstructorParameters<typeof UrlScheme>[0]) {
    try {
      this._scheme = new Url.UrlScheme(scheme);

      if (this.scheme === "")
        this._scheme = new Url.UrlScheme("https");
    }
    catch (e) {
      throw new Error(`Url: set scheme: error setting scheme: \n${e as string}`);
    }
  }

  public set host(host: ConstructorParameters<typeof UrlHost>[0]) {
    try {
      this._host = new Url.UrlHost(host);
    }
    catch (e) {
      throw new Error(`Url: set host: error setting host: \n${e as string}`);
    }
  }

  public set port(port: ConstructorParameters<typeof UrlPort>[0]) {
    try {
      this._port = new Url.UrlPort(port);
    }
    catch (e) {
      throw new Error(`Url: set port: error setting port: \n${e as string}`);
    }
  }

  public set path(path: ConstructorParameters<typeof UrlPath>[0]) {
    try {
      this._path = new Url.UrlPath(path);
    }
    catch (e) {
      throw new Error(`Url: set path: error setting path: \n${e as string}`);
    }
  }

  public set query(query: ConstructorParameters<typeof UrlQuery>[0]) {
    try {
      this._query = new Url.UrlQuery(query);
    }
    catch (e) {
      throw new Error(`Url: set query: error setting query: \n${e as string}`);
    }
  }

  public set fragment(fragment: ConstructorParameters<typeof UrlFragment>[0]) {
    try {
      this._fragment = new Url.UrlFragment(fragment);
    }
    catch (e) {
      throw new Error(`Url: set fragment: error setting fragment: \n${e as string}`);
    }
  }

  public static encode(url: string): string {
    try {
      return encodeURI(url.trim())
        .trim();
    }
    catch (e) {
      throw new Error(`Url: encode: error encoding url: \n${e as string}`);
    }
  }

  public static decode(url: string): string {
    try {
      return decodeURI(url.trim())
        .trim();
    }
    catch (e) {
      throw new Error(`Url: decode: error decoding url: \n${e as string}`);
    }
  }

  public static encodePart(part: string): string {
    try {
      return encodeURIComponent(part.trim())
        .trim();
    }
    catch (e) {
      throw new Error(`Url: encodePart: error encoding part: \n${e as string}`);
    }
  }

  public static decodePart(part: string): string {
    try {
      return decodeURIComponent(part.trim())
        .trim();
    }
    catch (e) {
      throw new Error(`Url: decodePart: error decoding part: \n${e as string}`);
    }
  }

  public append(...path: Parameters<UrlPath["append"]>): this {
    try {
      this.path = this._path.append(...path);

      return this;
    }
    catch (e) {
      throw new Error(`Url: append: error appending path: \n${e as string}`);
    }
  }

  public hasParam(...key: Parameters<UrlQuery["hasParam"]>): boolean {
    try {
      return this._query.hasParam(...key);
    }
    catch (e) {
      throw new Error(
        `Url: hasParam: error checking if query has param`,
        { cause: e },
      );
    }
  }

  public getParam(...key: Parameters<UrlQuery["getParam"]>): string {
    try {
      return this._query.getParam(...key);
    }
    catch (e) {
      throw new Error(`Url: getParam: error getting param: \n${e as string}`);
    }
  }

  public addParam(...params: Parameters<UrlQuery["addParam"]>): this {
    try {
      this.query = this._query.addParam(...params);

      return this;
    }
    catch (e) {
      throw new Error(`Url: addParam: error adding param: \n${e as string}`);
    }
  }

  public deleteParam(...keys: Parameters<UrlQuery["deleteParam"]>): this {
    try {
      this.query = this._query.deleteParam(...keys);

      return this;
    }
    catch (e) {
      throw new Error(`Url: deleteParam: error deleting param: \n${e as string}`);
    }
  }

  public open(): this {
    try {
      Safari.open(this.url);

      return this;
    }
    catch (e) {
      throw new Error(`Url: open: error opening url: \n${e as string}`);
    }
  }

  public async webview(fullScreen: boolean = false): Promise<this> {
    try {
      await WebView.loadURL(
        this.url,
        undefined,
        fullScreen,
      );

      return this;
    }
    catch (e) {
      throw new Error(`Url: webview: error opening url: \n${e as string}`);
    }
  }

  public async xCallback(): Promise<any> {
    try {
      const baseUrl = new Url(this);

      baseUrl.query = "";

      baseUrl.fragment = "";

      const callbackUrl = new CallbackURL(baseUrl.toString());

      Array.from(this._query.queryMap.entries())
        .forEach(([
          key,
          value,
        ]) => {
          callbackUrl.addParameter(
            key,
            value,
          );
        });

      var response: Record<string, null | string | number | boolean> = {};

      await callbackUrl.open()
        .then(_response => {
          response = _response;
        });

      return response;
    }
    catch (e) {
      throw new Error(`Url: xCallback: error opening url: \n${e as string}`);
    }
  }

  public toString(): string {
    try {
      return this.url;
    }
    catch (e) {
      throw new Error(`Url: toString: error getting url: \n${e as string}`);
    }
  }

  private _parse(url: string | Url | Url.UrlRecords): Url.UrlRecords {
    try {
      let urlStringParts: Url.UrlRecords = {};

      if (typeof url === "string") {
        const url_fragment: string[] = url.trim()
          .split("#");
        const urlWithoutFragment = url_fragment.shift() ?? "";

        urlStringParts.fragment = url_fragment.join("#");

        const queryOrSchemehostportpath_query: string[] = urlWithoutFragment.split("?");
        const queryOrSchemehostportpath: string = queryOrSchemehostportpath_query.shift() ?? "";
        const schemehostportpath: string = queryOrSchemehostportpath.includes("=")
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

        urlStringParts.scheme = scheme_hostportpath.length > 0
          ? schemeOrHostportpath
          : schemeOrHostportpath
            .includes(".")
            || schemeOrHostportpath
              .includes("/")
            ? ""
            : schemeOrHostportpath;

        const hostportpath: string = scheme_hostportpath.length > 0
          ? scheme_hostportpath
            .join("://")
          : urlStringParts.scheme === ""
            ? schemeOrHostportpath
            : "";
        const hostport_path: string[] = hostportpath.split("/");
        const hostport: string = hostport_path.shift() ?? "";

        urlStringParts.path = hostport_path.join("/");

        const host_port: string[] = hostport.split(":");

        urlStringParts.host = host_port.shift() ?? "";

        urlStringParts.port = urlStringParts.host === ""
          ? ""
          : host_port
            .join(":");
      }
      else {
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
    }
    catch (e) {
      throw new Error(`Url: parse: error parsing url: \n${e as string}`);
    }
  }
}

namespace Url {
  export interface UrlRecords {
    scheme?: ConstructorParameters<typeof UrlScheme>[0];
    host?: ConstructorParameters<typeof UrlHost>[0];
    port?: ConstructorParameters<typeof UrlPort>[0];
    path?: ConstructorParameters<typeof UrlPath>[0];
    query?: ConstructorParameters<typeof UrlQuery>[0];
    fragment?: ConstructorParameters<typeof UrlFragment>[0];
  }
}

module.exports = Url;

interface UrlParts {
  scheme?: (string
    | typeof _Url.Scheme
    | undefined
  ),
  host?: (string
    | typeof _Url.Host
    | undefined
  ),
  port?: (string
    | number
    | typeof _Url.Port
    | undefined
  ),
  path?: (string
    | typeof _Url.Path
    | undefined
  ),
  query?: (string
    | typeof _Url.Query
    | undefined
  ),
  fragment?: (string
    | typeof _Url.Fragment
    | undefined
  )
};

class _Url {
  #scheme: typeof _Url.Scheme;
  #host: typeof _Url.Host;
  #port: typeof _Url.Port;
  #path: typeof _Url.Path;
  #query: typeof _Url.Query;
  #fragment: typeof _Url.Fragment;

  constructor();
  constructor(url: _Url);
  constructor(parts: UrlParts);

  constructor(
    input?: undefined | _Url | UrlParts
  ) {
    if (input === undefined) {
      this.scheme = new _Url.Scheme();
      this.host = new _Url.Host();
      this.port = new _Url.Port();
      this.path = new _Url.Path();
      this.query = new _Url.Query();
      this.fragment = new _Url.Fragment();
    }
    else if (input instanceof _Url) {
      this.scheme = input.scheme;
      this.host = input.host;
      this.port = input.port;
      this.path = input.path;
      this.query = input.query;
      this.fragment = input.fragment;
    }
    else {
      this.scheme = input.scheme;
      this.host = input.host;
      this.port = input.port;
      this.path = input.path;
      this.query = input.query;
      this.fragment = input.fragment;
    }
  }

  static get UrlPart() {
    return importModule("parts/UrlPart");
  }
  static get Scheme() {
    return _Url.UrlPart.Scheme;
  }
  static get Host() {
    return _Url.UrlPart.Host;
  }
  static get Port() {
    return _Url.UrlPart.Port;
  }
  static get Path() {
    return _Url.UrlPart.Path;
  }
  static get Query() {
    return _Url.UrlPart.Query;
  }
  static get Fragment() {
    return _Url.UrlPart.Fragment;
  }

  get scheme(): string {
    return this.#scheme.string;
  }

  set scheme(
    scheme: (string
      | typeof _Url.Scheme
      | undefined
    )
  ) {
    this.#scheme = new _Url.Scheme(
      scheme
    );
  }

  get host(): string {
    return this.#host.string;
  }

  set host(
    host: (string
      | typeof _Url.Host
      | undefined
    )
  ) {
    this.#host = new _Url.Host(host);
  }

  get port(): string {
    return this.#port.string;
  }

  set port(
    port: (string
      | number
      | typeof _Url.Port
      | undefined
    )
  ) {
    this.#port = new _Url.Port(port);
  }

  get path(): string {
    return this.#path.string;
  }

  set path(
    path: (string
      | typeof _Url.Path
      | undefined
    )
  ) {
    this.#path = new _Url.Path(path);
  }

  get query(): string {
    return this.#query.string;
  }

  set query(
    query: (string
      | typeof _Url.Query
      | undefined
    )
  ) {
    this.#query = new _Url.Query(query);
  }

  get fragment(): string {
    return this.#fragment.string;
  }

  set fragment(
    fragment: (string
      | typeof _Url.Fragment
      | undefined
    )
  ) {
    this.#fragment = new _Url.Fragment(
      fragment
    );
  }

  get string(): string {
    return _Url.joinUrlParts(this);
  }

  toString(): string {
    return this.string;
  }

  static joinUrlParts(
    parts: _Url | UrlParts
  ): string {
    return (
      _Url.appendFragmentToLeft(
        _Url.appendQueryToLeft(
          _Url.appendPathToLeft(
            _Url.appendPortToLeft(
              _Url.appendHostToScheme(
                parts.scheme
                  ?? new _Url.Scheme(),
                parts.host
                  ?? new _Url.Host()
              ),
              parts.port
                ?? new _Url.Port()
            ),
            parts.path
              ?? new _Url.Path()
          ),
          parts.query
            ?? new _Url.Query()
        ),
        parts.fragment
          ?? new _Url.Fragment()
      )
    ).trim();
  }

  static appendHostToScheme(
    scheme: (string
      | typeof _Url.Scheme
    ),
    host: (string
      | typeof _Url.Host
    )
  ): string {
    scheme = new _Url
      .Scheme(scheme)
      .string as string;
    host = new _Url
      .Host(host)
      .string as string;
    const separator: string = (
      scheme === String()
    )?
      String()
      :"://";
    return [
      scheme,
      host
    ]
    .join(separator)
    .trim();
  }

  static appendPortToLeft(
    left: string,
    port: (string
      | number
      | typeof _Url.Port
    )
  ): string {
    left = left.trim();
    port = (left === String())?
      String()
      :new _Url
        .Port(port)
        .string as string;
    const separator: string = (
      port === String() || port === "0"
    )?
      String()
      :":";
    return [
      left,
      port
    ]
    .join(separator)
    .trim();
  }

  static appendPathToLeft(
    left: string,
    path: (string
      | typeof _Url.Path
    )
  ): string {
    left = left.trim();
    path = new _Url
      .Path(path)
      .string as string;
    const separator: string = String();
    return [
      left,
      path
    ]
    .join(separator)
    .trim();
  }

  static appendQueryToLeft(
    left: string,
    query: (string
      | typeof _Url.Query
    )
  ): string {
    left = left.trim();
    query = new _Url
      .Query(query)
      .string as string;
    const separator: string = (
      query === String()
    )?
      String()
      :"?";
    return [
      left,
      query
    ]
    .join(separator)
    .trim();
  }

  static appendFragmentToLeft(
    left: string,
    fragment: (string
      | typeof _Url.Fragment
    )
  ): string {
    left = left.trim();
    fragment = new _Url
      .Fragment(fragment)
      .string as string;
    const separator = (
      fragment === String()
    )?
      String()
      :"#";
    return [
      left,
      fragment
    ]
    .join(separator)
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

module.exports = _Url;

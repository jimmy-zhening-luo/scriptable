interface UrlParts {
  scheme?: string | Scheme,
  host?: string | Host,
  port?: string | number | Port,
  path?: string | Path,
  query?: string | Query,
  fragment?: string | Fragment
};

class Url {
  #scheme: Scheme;
  #host: Host;
  #port: Port;
  #path: Path;
  #query: Query;
  #fragment: Fragment;
  constructor(
    input?: undefined | Url | UrlParts
  ) {
    if (input === undefined) {
      this.#scheme = new Scheme();
      this.#host = new Host();
      this.#port = new Port();
      this.path = new Path();
      this.query = new Query();
      this.fragment = new Fragment();
    }
    else if (input instanceof Url) {
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

  get scheme(): string {
    return this.#scheme.string;
  }

  set scheme(
    scheme: (string
      | Scheme
      | undefined
    )
  ) {
    this.#scheme = new Scheme(
      scheme
    );
  }

  get host(): string {
    return this.#host.string;
  }

  set host(
    host: (string
      | Host
      | undefined
    )
  ) {
    this.#host = new Host(host);
  }

  get port(): string {
    return this.#port.string;
  }

  set port(
    port: (string
      | number
      | Port
      | undefined
    )
  ) {
    this.#port = new Port(port);
  }

  get path(): string {
    return this.#path.string;
  }

  set path(
    path: (string
      | Path
      | undefined
    )
  ) {
    this.#path = new Path(path);
  }

  get query(): string {
    return this.#query.string;
  }

  set query(
    query: (string
      | Query
      | undefined
    )
  ) {
    this.#query = new Query(query);
  }

  get fragment(): string {
    return this.#fragment.string;
  }

  set fragment(
    fragment: (string
      | Fragment
      | undefined
    )
  ) {
    this.#fragment = new Fragment(
      fragment
    );
  }

  get string(): string {
    return Url.joinUrlParts(this);
  }

  toString(): string {
    return this.string;
  }

  static joinUrlParts(
    parts: Url | UrlParts
  ): string {
    return (
      Url.appendFragmentToLeft(
        Url.appendQueryToLeft(
          Url.appendPathToLeft(
            Url.appendPortToLeft(
              Url.appendHostToScheme(
                parts.scheme
                  ?? new Scheme(),
                parts.host
                  ?? new Host()
              ),
              parts.port
                ?? new Port()
            ),
            parts.path
              ?? new Path()
          ),
          parts.query
            ?? new Query()
        ),
        parts.fragment
          ?? new Fragment()
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
    scheme = new Url
      .Scheme(scheme)
      .string as string;
    host = new Url
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
      | Port
    )
  ): string {
    left = left.trim();
    port = (left === String())?
      String()
      :new Url
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
      | Path
    )
  ): string {
    left = left.trim();
    path = new Url
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
      | Query
    )
  ): string {
    left = left.trim();
    query = new Url
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
      | Fragment
    )
  ): string {
    left = left.trim();
    fragment = new Url
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

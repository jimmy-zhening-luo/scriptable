abstract class _UrlPart {
  
  readonly part: string;
  
  constructor();
  constructor(part: string);
  constructor(part: _UrlPart);
  
  constructor(
    part?: (string
      | _UrlPart
      | undefined
    )
  ) {
    if (part === undefined)
      this.part = String();
    else if (part.constructor === String)
      this.part = this
        .parse(part as string)
        ?? String();
    else if (part instanceof _UrlPart)
      this.part = this
        .parse(part.string)
        ?? String();
    else
      this.part = String();
  }
  
  get string(): string {
    return this.part;
  }
  
  toString(): string {
    return this.string;
  }
  
  abstract protected parse(input: any): string | null;
}

class _Scheme extends _UrlPart {
  constructor(
    scheme?: (string
      | typeof _Scheme
      | undefined
    )
  ) {
    super(scheme);
  }
  
  protected parse(
    scheme: string
  ): string | null {
    // parsing grammar TBD
    return scheme as string;
  }
}

class _Host extends _UrlPart {
  #host = undefined;
  constructor(
    host = String()
      ?? new this()
      ?? new IP()
      ?? new RegName()
  ) {
    this.#host = parseHost(host)
      ?? null;
  }
  
  const IP = importModule("host/IP");
  const IPv4 = importModule("host/IPv4");
  const IPv6 = importModule("host/IPv6");
  const RegName = importModule(
    "host/RegName"
    );
  
  get host() {
    return this.#host ?? String();
  }
  
  get string() {
    return this.host ?? String();
  }
  
  toString() {
    return this.host ?? String();
  }
  
  static parseHost(
    host = String()
  ) {
    return this.parseIP(host)
    ?? this.parseRegName(host)
    ?? null;
  }
  
  static parseIP(
    host = String()
  ) {
    return this.parseIPv4(host)
    ?? this.parseIPv6(host)
    ?? null;
  }
  
  static parseIPv4(
    host = String()
  ) {
    const ip = new IPv4(host) ?? null;
    return (
      (
        ip
        ?.string
        ?? String()
      ) === String()
    )?
    null
    :(ip ?? null)
  }
  
  static parseIPv6(
    host = String()
  ) {
    const ip = new IPv6(host) ?? null;
    return (
      (
        ip
        ?.string
        ?? String()
      ) === String()
    )?
    null
    :(ip ?? null)
  }
  
  static parseRegName(
    host = String()
  ) {
    const reg = new RegName(host) ?? null;
    return (
      (
        reg
        ?.string
        ?? String()
      ) === String()
    )?
    null
    :(reg ?? null)
  }
}

class _Port extends _UrlPart {
  constructor(
    port?: (string 
      | number
      | typeof _Url.Port
      | undefined
    )
  ) {
    if (port?.constructor === Number)
      port = _Port.parseNumberToString(port);
    super(port);
  }
  
  get number(): number {
    return _Port
      .parseStringToNumber(
        this.string
      );
  }
  
  toNumber(
    allowZero?: boolean | undefined
  ): number | null {
    const zeroValue: number | null = (
      allowZero === true
    )?
      Number()
      :null;
    return (this.number === Number())?
      emptyValue
      :this.number;
  }
  
  protected parse(
    port = Number()
      ?? String()
      ?? new this()
  ) {
    port = port ?? String();
    if (port?.constructor === String)
      port = this
        .parsePortNumberFromString(
          port
      )
      ?? Number();
    else if (
      port
      ?.portNumber
      ?.constructor === Number
    )
      port = port
        .portNumber
        ?? Number();
    else if (
      port
      ?.constructor !== Number
    )
      port = Number();
    
    return this
    .parsePortStringFromNumber(
      port
    )
    ?? String();
  }
  
  static parsePortNumberFromString(
    port = String()
  ) {
    port = (port?.constructor === String)?
      port.trim()
      :String();
    while (port.startsWith(":"))
      port = port.slice(1);
    const parsedPort = Number
      .parseInt(
        port.trim(),
        10
      );
    return Number
      .isNaN(
        parsedPort
      )?
        Number()
        :(
          parsedPort >= 1
          && parsedPort < 65536
        )?
          Math.trunc(parsedPort)
          :Number();
  }
  
  static parsePortStringFromNumber(
    port = Number()
  ) {
    port = (
      port?.constructor === Number
      && !Number.isNan(port)
    )?
      Math.trunc(port)
      :Number();
    
    return (
      parsedPort >= 1
      && parsedPort < 65536
    )?
      String(Math.trunc(parsedPort))
        ?.trim()
        ?? String()
      :String();
  }
}


class _Path extends _UrlPart {
  #parts = new Array(new PathSegment());
  protected static get PathSegment() {
    return importModule("path/PathSegment");
  }
}

class _Query extends _UrlPart {
  #params = new Array(new QueryParam());
  constructor(
  
  )
  
  protected static get QueryParam() {
    return importModule("query/QueryParam");
  }
  
  static fromObjectEntries() {
    
  }
  
  static fromQueryString() {
    
  }
}

class _Fragment extends _UrlPart {
  #fragment = String()
  constructor (
    fragment = String()
      ?? new this()
  ) {
    this.fragment = fragment;
  }
  
  get fragment() {
    return this.#fragment
      ?? String();
  }
  
  set fragment(
    fragment = String()
      ?? new this.constructor()
  ) {
    this.#fragment = this
      .constructor
      .parseFragment(
        fragment
      )
      ?? String();
  }
  
  get string() {
    return this.fragment
      ?? String();
  }
  
  toString() {
    return this.string
      ?? String();
  }
  
  static allowed(
    char = String()
  ) {
    // WIP
    char = (char?.constructor === String)?
      char.trim().slice(0, 1)
      :String();
    
      // pchar, /, ?
    return false;
  }
  
  static parseFragment(
    fragment = String()
      ?? new this()
  ) {
    if (fragment?.constructor === String)
      fragment = fragment.trim();
    else if (
      fragment
      ?.fragment
      ?.constructor === String
    )
      fragment = fragment
        .fragment
        ?? String();
    while (fragment.startsWith("#"))
      fragment = fragment
        .slice(1)
        .trim();
    return [...fragment].every(
      (char) => (
        this.allowed(char)
      )
    )?
      fragment
      :String();
    }
}

module.exports = _UrlPart;
module.exports.UrlPart = _UrlPart;
module.exports.Scheme = _Scheme;
module.exports.Host = _Host;
module.exports.Port = _Port;
module.exports.Path = _Path;
module.exports.Query = _Query;
module.exports.Fragment = _Fragment;

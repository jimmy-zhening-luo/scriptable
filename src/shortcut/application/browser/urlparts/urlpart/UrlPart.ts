abstract class _UrlPart {
  readonly part: string;
  constructor(
    part: _UrlPart
      | string = String()
  ) {
    this.part = part instanceof _UrlPart ?
      this.parse(part.string)
      : this.parse(part);
  }

  get string(): string {
    return this.part;
  }

  toString(): string {
    return this.string;
  }

  protected abstract parse(part: string): string;
}

namespace _UrlPart {
  export const StringValidator = importModule("./system/validation/Validation.ts");

  export abstract class UrlValidator extends StringValidator {
   }
  export namespace UrlValidator {
    export class SchemeValidator extends UrlValidator {
      constructor(scheme: string) {
        super(
          scheme,
          {
            toLower: true,
            trimTrailing: [
              CharSet.UrlCharSet.slash,
              CharSet.UrlCharSet.colon
            ]
          },
          CharSet.UrlCharSet.alphaNumericLower,
          CharSet.UrlCharSet.plus,
          CharSet.UrlCharSet.dot,
          CharSet.UrlCharSet.hyphen
        );
      }
    }

    export class PortValidator extends UrlValidator {
      constructor(port: string) {
        super(
          port,
          {
            trimLeading: [
              CharSet.UrlCharSet.colon,
              CharSet.UrlCharSet.space
            ]
          },
          CharSet.UrlCharSet.numbers
        );
      }
    }

    export class FragmentValidator extends UrlValidator {
      constructor(fragment: string) {
        super(
          fragment,
          {
            trimLeading: [
              CharSet.UrlCharSet.hash,
              CharSet.UrlCharSet.space
            ]
          }
        );
      }
    }
  }

  export class Scheme extends _UrlPart {
    constructor(scheme?: string | Scheme) {
      super(scheme);
    }

    protected parse(scheme: string): string {
      return new UrlValidator.SchemeValidator(scheme)
        .validated;
    }
  }

  // WIP
  export class Host extends _UrlPart {
    constructor(
      host?: string | Host
    ) {
      super(host);
    }

    static get IP() {
      return importModule("host/IP");
    }
    static get IPv4() {
      return Host.IP.IPv4;
    }
    static get IPv6() {
      return Host.IP.IPv6;
    }
    static get RegName() {
      return importModule("host/RegName");
    }

    protected parse(host: any): string {
      return (this.parseIP(host) !== String()) ?
        this.parseIP(host)
        : (this.parseRegName(host) !== String()) ?
          this.parseRegName(host)
          : String();
    }

    protected parseIP(
      host: any
    ): string {
      return (this.parseIPv4(host) !== String()) ?
        this.parseIPv4(host)
        : (this.parseIPv6(host) !== String()) ?
          this.parseIPv6(host)
          : String();
    }

    protected parseIPv4(
      host: any
    ): string {
      return new Host.IPv4(host).string;
    }

    protected parseIPv6(
      host: any
    ): string {
      return new Host.IPv6(host).string;
    }

    protected parseRegName(
      host: any
    ): string {
      return new Host.RegName(host).string;
    }
  }

  // WIP
  export class Port extends _UrlPart {
    constructor(
      port?: string
        | number
        | Port
    ) {
      super(
        typeof port === "number" ?
          Number.isInteger(port) ?
            String(Math.trunc(port))
            : String()
          : port
      );
    }

    protected parse(
      port: string
    ): string {
      const parsedString: string = new PortValidator(port)
        .validated;
      const parsedInt: number = Number.isInteger(
        Number.parseInt(parsedString)
      ) ?
        Math.round(Number.parseInt(parsedString))
        : 0;
      return (
        parsedInt >= 1
        && parsedInt <= 65535
      ) ?
        String(Math.round(parsedInt)).trim()
        : String();
    }

    get number(): number {
      return (this.string === String()) ?
        0
        : Math.abs(Math.round(Number.parseInt(this.string)));
    }

    toNumber(
      coerceEmptyPortToNull: boolean = false
    ): null | number {
      const zeroValue: null | number = coerceEmptyPortToNull ?
        null
        : 0;
      return this.number === 0 ?
        zeroValue
        : this.number;
    }
  }

  // WIP
  export class Path extends _UrlPart {
    constructor(
      path?: (string
        | Path
        | undefined
      )
    ) {
      super(path);
    }

    protected static get PathSegment() {
      return importModule("path/PathSegment");
    }

    protected parse(path: string): string {
      return path;
    }

  }

  // WIP
  export class Query extends _UrlPart {
    readonly params: Array<typeof Query.QueryParam>;
    constructor(
      query?: (string
        | Query
        | undefined
      )
    ) {
      super(query);
      this.params = new Array<typeof Query.QueryParam>();
    }

    protected static get QueryParam() {
      return importModule("query/QueryParam");
    }

    protected parse(query: string): string {
      return query;
    }

    static fromObjectEntries() {

    }

    static fromQueryString() {

    }
  }

  // WIP
  export class Fragment extends _UrlPart {
    readonly encode: boolean;
    constructor(
      fragment?: string
        | Fragment,
      encode: boolean = true
    ) {
      super(fragment);
      this.encode = encode;
    }

    override get string(): string {
      return this.encode ?
        encodeURIComponent(super.string)
        : super.string;
    }

    protected parse(
      fragment: string
    ): string {
      return new FragmentValidator(fragment)
        .cleaned;
    }
  }
}

module.exports = _UrlPart;

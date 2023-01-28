class CharSet {
  readonly chars: Array<string>;
  constructor(
    ...charSets: Array<string | CharSet | Array<string>>
  ) {
    this.chars = new Array<string>();
    charSets.forEach(
      (set) => {
        Array.isArray(set) ?
          this.chars.push(...set)
          : typeof set === "string" ?
            this.chars.push(set)
            : this.chars.push(
                ...set.chars
              );
      }
    );
  }

  includes(char: string): boolean {
    return this.chars.includes(char)
  }

  static get alphaNumeric(): Array<string> {
    return [
      ...this.numbers,
      ...this.alpha
    ];
  }

  static get alphaNumericLower(): Array<string> {
    return [
      ...this.numbers,
      ...this.alphaLower
    ];
  }

  static get alphaNumericUpper(): Array<string> {
    return [
      ...this.numbers,
      ...this.alphaUpper
    ];
  }

  static get numbers(): Array<string> {
    return [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9"
    ];
  }

  static get alpha(): Array<string> {
    return [
      ...this.alphaLower,
      ...this.alphaUpper
    ];
  }

  static get alphaLower(): Array<string> {
    return [
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
    ];
  }

  static get alphaUpper(): Array<string> {
    return [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z"
    ];
  }

  static get dot(): string {
    return ".";
  }

  static get plus(): string {
    return "+";
  }

  static get hyphen(): string {
    return "-";
  }

  static get dollar(): string {
    return "$";
  }

  static get underscore(): string {
    return "_";
  }

  static get exclam(): string {
    return "!";
  }

  static get asterisk(): string {
    return "*";
  }

  static get quote(): string {
    return "'";
  }

  static get leftParen(): string {
    return "(";
  }

  static get rightParen(): string {
    return ")";
  }

  static get comma(): string {
    return ",";
  }

  static get leftBrace(): string {
    return "{";
  }

  static get rightBrace(): string {
    return "}";
  }

  static get or(): string {
    return "|";
  }

  static get backslash(): string {
    return "\\";
  }

  static get caret(): string {
    return "^";
  }

  static get tilde(): string {
    return "~";
  }

  static get leftBracket(): string {
    return "[";
  }

  static get rightBracket(): string {
    return "]";
  }

  static get backTick(): string {
    return "`";
  }

  static get lessThan(): string {
    return "<";
  }

  static get greaterThan(): string {
    return ">";
  }

  static get hash(): string {
    return "#";
  }

  static get percent(): string {
    return "%";
  }

  static get doubleQuote(): string {
    return "\"";
  }

  static get semicolon(): string {
    return ";";
  }

  static get slash(): string {
    return "/";
  }

  static get question(): string {
    return "?";
  }

  static get colon(): string {
    return ":";
  }

  static get at(): string {
    return "@";
  }

  static get and(): string {
    return "&";
  }

  static get equal(): string {
    return "=";
    }


}

abstract class UrlCharSet extends CharSet {
  static get safe(): Array<string> {
    return [
      this.dollar,
      this.hyphen,
      this.underscore,
      this.dot,
      this.plus
    ];
  }

  static get extra(): Array<string> {
    return [
      this.exclam,
      this.asterisk,
      this.quote,
      this.leftParen,
      this.rightParen,
      this.comma
    ];
  }

  static get national(): Array<string> {
    return [
      this.leftBrace,
      this.rightBrace,
      this.or,
      this.backslash,
      this.caret,
      this.tilde,
      this.leftBracket,
      this.rightBracket,
      this.backTick
    ];
  }

  static get punctuation(): Array<string> {
    return [
      this.lessThan,
      this.greaterThan,
      this.hash,
      this.percent,
      this.doubleQuote
    ];
  }

  static get hex(): Array<string> {
    return [
      ...this.numbers,
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f"
    ];
  }

  static get unreserved(): Array<string> {
    return [
      ...this.alphaNumeric,
      ...this.safe,
      ...this.extra
    ];
  }
}

abstract class RepeatedChar {
  readonly charset: CharSet
  constructor(
    charset: CharSet
  ) {
    this.charset = charset;
  }

  abstract match(token: string): boolean;
}

class MinMaxRepeatedChar extends RepeatedChar {
  readonly minRepetitions: number;
  readonly maxRepetitions: number;
  constructor(
    charset: CharSet,
    minRepetitions: number,
    maxRepetitions: number
  ) {
    super(charset);
    if (
      minRepetitions < 0
      || maxRepetitions < 0
      || Number.isNaN(minRepetitions)
      || Number.isNaN(maxRepetitions)
    )
      minRepetitions = maxRepetitions = 0;

    if (minRepetitions > maxRepetitions) {
      const tmp: number = minRepetitions;
      minRepetitions = maxRepetitions;
      maxRepetitions = tmp;
    }

    if (!Number.isFinite(minRepetitions))
      this.minRepetitions = this.maxRepetitions = 0;
    else {
      this.minRepetitions = minRepetitions;
      this.maxRepetitions = maxRepetitions;
    }
  }

  match(token: string): boolean {
    // turn token into iterator
    // get next until N or until token stream is dry
    // match token char to charset.includes
    return false;
  }
}

class NOfChar extends MinMaxRepeatedChar {
  constructor(
    charset: CharSet,
    count: number
  ) {
    super(charset, count, count);
  }

  get repetitions() {
    return this.minRepetitions;
  }
}

class OneOfChar extends NOfChar {
  constructor(
    charset: CharSet
  ) {
    super(charset, 1);
  }
}

type ValidationPattern = NOfChar
  | CharSet
  | string
  | Array<ValidationPattern>;

abstract class StringValidator {
  readonly raw: string;
  readonly cleaned: string;
  readonly pattern: NOfChar;
  constructor(
    text: string,
    pattern: ValidationPattern
    {
      toLower = false,
      trim = true,
      trimLeading = [],
      trimTrailing = []
    }: {
        toLower?: boolean,
        trim?: boolean,
        trimLeading?: Array<string>,
        trimTrailing?: Array<string>
      }
  ) {
    this.raw = text;
    this.pattern = pattern instanceof NOfChar ?
      pattern
      : pattern instanceof CharSet ?
        new OneOfChar(pattern)
        : Array.isArray(pattern) ?

    this.cleaned = this.clean(
      text,
      toLower,
      trim,
      trimLeading,
      trimTrailing
    );
  }

  get isValid(): boolean {
    const tokens: Array<string> = this
      .splitStringIntoTokens(
        this.cleaned
      );

    return tokens.every(
      (token: string) => (
        // TBD matching logic
      )
    );
  }

  get validated(): string {
    return this.isValid ?
      this.cleaned
      : String();
  }

  private clean(
    text: string,
    toLower: boolean,
    trim: boolean,
    trimLeading: Array<string>,
    trimTrailing: Array<string>
  ): string {
    text = trim ?
      text.trim()
      : text;

    text = toLower ?
      text.toLowerCase()
      : text;

    for (const word of trimLeading
      .filter((word) => (
        word.length > 0
      ))
    ) while (text.startsWith(word))
        text = text.slice(
          word.length
        );

    for (const word of trimTrailing
      .filter((word) => (
        word.length > 0
      ))
    ) while (text.endsWith(word))
        text = text.slice(
          0, 0 - word.length
        );

    return text;
  }

  private splitStringIntoTokens(url: string): Array<string> {
    // TBD tokenize
    return [...url];
  }
}

abstract class UrlValidator extends StringValidator {

}

class SchemeValidator extends UrlValidator {
  constructor(scheme: string) {
    super(
      scheme,
      {
        toLower: true,
        trimTrailing: [
          UrlValidator.slash,
          UrlValidator.colon
        ]
      },
      UrlValidator.alphaNumericLower,
      UrlValidator.plus,
      UrlValidator.dot,
      UrlValidator.hyphen
    );
  }
}

class PortValidator extends UrlValidator {
  constructor(port: string) {
    super(
      port,
      {
        trimLeading: [
          ":",
          " "
        ]
      },
      UrlValidator.numbers
    );
  }
}

class FragmentValidator extends UrlValidator {
  constructor(fragment: string) {
    super(
      fragment,
      {
        trimLeading: [
          "#",
          " "
        ]
      }
    );
  }
}

abstract class _UrlPart {
  readonly part: string;
  constructor(
    part?: (string
      | _UrlPart
      | undefined
    )
  ) {
    this.part = part === undefined ?
      String()
      : part instanceof _UrlPart ?
        this.parse(part.string)
        : this.parse(part);
  }

  get string(): string {
    return this.part;
  }

  toString(): string {
    return this.string;
  }

  protected abstract parse(
    part: string
  ): string;
}

class _Scheme extends _UrlPart {
  constructor(
    scheme?: (string
      | _Scheme
      | undefined
    )
  ) {
    super(scheme);
  }

  protected parse(
    scheme: string
  ): string {
    return new SchemeValidator(scheme)
      .validated;
  }
}

// WIP
class _Host extends _UrlPart {
  constructor(
    host?: (string
      | _Host
      | undefined
    )
  ) {
    super(host);
  }

  static get IP() {
    return importModule("host/IP");
  }
  static get IPv4() {
    return _Host.IP.IPv4;
  }
  static get IPv6() {
    return _Host.IP.IPv6;
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
    return new _Host.IPv4(host).string;
  }

  protected parseIPv6(
    host: any
  ): string {
    return new _Host.IPv6(host).string;
  }

  protected parseRegName(
    host: any
  ): string {
    return new _Host.RegName(host).string;
  }
}

class _Port extends _UrlPart {
  constructor(
    port?: (string
      | number
      | _Port
      | undefined
    )
  ) {
    super(
      typeof port !== "number" ?
        port
        : Number.isInteger(port) ?
          String(Math.trunc(port))
          : String()
    );
  }

  protected parse(
    port: string
  ): string {
    const parsedString: string = new PortValidator(port)
      .validated;
    const parsedInt: number = Number
      .isInteger(Number.parseInt(port)) ?
        Math.trunc(Number.parseInt(port))
        : 0;
    return (
      portInt >= 1
      && portInt <= 65535
    ) ?
      String(portInt).trim()
      : String();
  }

  get number(): number {
    return (this.string === String()) ?
      0
      : Number.parseInt(this.string);
  }

  toNumber(
    coerceEmptyPortToNull: boolean = false
  ): null | number {
    const zeroValue: (
      null | number
    ) = coerceEmptyPortToNull ?
        null
        : 0;
    return (this.number === 0)?
      zeroValue
      : this.number;
  }
}

// WIP
class _Path extends _UrlPart {
  constructor(
    path?: (string
      | _Path
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
class _Query extends _UrlPart {
  readonly params: Array<typeof _Query.QueryParam>;
  constructor(
    query?: (string
      | _Query
      | undefined
    )
  ) {
    super(query);
    this.params = new Array<typeof _Query.QueryParam>();
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

class _Fragment extends _UrlPart {
  readonly encode: boolean;
  constructor(
    fragment?: (string
      | _Fragment
      | undefined
    ),
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

module.exports = _UrlPart;
module.exports.UrlPart = _UrlPart;
module.exports.Scheme = _Scheme;
module.exports.Host = _Host;
module.exports.Port = _Port;
module.exports.Path = _Path;
module.exports.Query = _Query;
module.exports.Fragment = _Fragment;

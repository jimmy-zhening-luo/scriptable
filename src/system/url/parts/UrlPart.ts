abstract class Bounds {
  isBounded(
    value: undefined | null | number
  ): boolean {
    return value !== undefined
      && value !== null
      && !Number.isNaN(value);
  }
}

class InfiniteBounds extends Bounds {

}

class FiniteBounds extends Bounds {
  override isBounded(
    value: undefined | null | number
  ): boolean {
    return super.isBounded(value)
      && value !== Infinity
      && value !== -Infinity;
  }
}

abstract class Cardinality {
  isCardinal(
    value: undefined | null | number
  ): boolean {
    return value !== undefined
      && value !== null
      && !Number.isNaN(value);
  }
}

class AnyCardinality extends Cardinality {

}

class PositiveCardinality extends Cardinality {
  override isCardinal(
    value: undefined | null | number
  ): boolean {
    return super.isCardinal(value)
      && (
        value as number === 0
        || value as number === -0
        || value as number > 0
      );
  }
}

class NegativeCardinality extends Cardinality {
  override isCardinal(
    value: undefined | null | number
  ): boolean {
    return super.isCardinal(value)
      && (
        value as number === 0
        || value as number === -0
        || value as number < 0
      );
  }
}

abstract class RealNumber {
  abstract get number(): number;
  toNumber(): number {
    return this.number;
  }
  abstract get string(): string;
  toString(): string {
    return this.string;
  }
}

class Rational extends RealNumber {
  readonly bounds: Bounds;
  readonly cardinality: Cardinality;
  readonly value: number | null;
  constructor(
    value: Rational | number,
    cardinality: Cardinality = new AnyCardinality(),
    bounds: Bounds = new InfiniteBounds()
  ) {
    super();
    this.cardinality = cardinality;
    this.bounds = bounds;
    value = value instanceof Rational ?
      value.number
      : value;
    this.value = this.qualifies(value) ?
      value === -0 ?
        0
        : value
      : null;
  }

  protected qualifies(value: number): boolean {
    return this.bounds.isBounded(value)
      && this.cardinality.isCardinal(value);
  }

  get isNumber(): boolean {
    return !(this.value === null);
  }

  get isFinite(): boolean {
    return Number.isFinite(this.number);
  }

  get isInfinite(): boolean {
    return this.isPositiveInfinite
      || this.isNegativeInfinite;
  }

  get isPositiveInfinite(): boolean {
    return this.number === Infinity;
  }

  get isNegativeInfinite(): boolean {
    return this.number === -Infinity;
  }

  get isZero(): boolean {
    return this.number === 0;
  }

  get isStrictlyPositive(): boolean {
    return this.number > 0;
  }

  get isStrictlyNegative(): boolean {
    return this.number < 0;
  }

  get isPositive(): boolean {
    return this.isZero
      || this.isStrictlyPositive;
  }

  get isNegative(): boolean {
    return this.isZero
      || this.isStrictlyNegative;
  }

  get isInteger(): boolean {
    return Number.isInteger(this.number);
  }

  get string(): string {
    return this.isNumber?
      String()
      : String(this.value);
  }

  get number(): number {
    return this.isNumber ?
      this.value as number
      : NaN;
  }
}

class PositiveNumber extends Rational {
  constructor(
    value: Rational | number,
    bounds?: Bounds
  ) {
    super(value, new PositiveCardinality(), bounds);
  }
}

class NegativeNumber extends Rational {
  constructor(
    value: Rational | number,
    bounds?: Bounds
  ) {
    super(value, new NegativeCardinality(), bounds);
  }
}

class FiniteNumber extends Rational {
  constructor(
    value: Rational | number,
    cardinality?: Cardinality
  ) {
    super(value, cardinality, new FiniteBounds());
  }
}

class PositiveFiniteNumber extends FiniteNumber {
  constructor(value: Rational | number) {
    super(value, new PositiveCardinality());
  }
}

class NegativeFiniteNumber extends FiniteNumber {
  constructor(value: Rational | number) {
    super(value, new NegativeCardinality());
  }
}

class Integer extends Rational {
  protected override qualifies(value: number): boolean {
    return super.qualifies(value)
      && Number.isInteger(value);
  }
}

class PositiveInteger extends Integer {
  constructor(
    value: Rational | number,
    bounds: Bounds
  ) {
    super(value, new PositiveCardinality());
  }
}

class NegativeInteger extends Integer {
  constructor(
    value: Rational | number,
    bounds: Bounds
  ) {
    super(value, new NegativeCardinality());
  }
}

type CharSetInput = CharSet
  | string[]
  | string;

class CharSet {
  readonly chars: string[];
  constructor(
    ...charSets: CharSetInput[]
  ) {
    this.chars = new Array<string>();
    charSets.forEach(
      (charset: CharSetInput) => {
        charset instanceof CharSet ?
          this.chars.push(
            ...charset.chars
          )
          : Array.isArray(charset) ?
            this.chars.push(...charset)
            : this.chars.push(charset);
      }
    );
  }

  includes(char: string): boolean {
    return this.chars.includes(char);
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

  static get space(): string {
    return " ";
  }
}

class UrlCharSet extends CharSet {
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

type RepeatedCharInput = RepeatedChar
  | CharSetInput;

abstract class RepeatedChar {
  readonly charset: CharSet;
  constructor(
    ...charsets: Array<RepeatedCharInput>
  ) {
    const chars: Array<string> = [];
    charsets.forEach(
      (charset) => {
        if (charset instanceof RepeatedChar)
          chars.push(...charset.charset.chars);
        else if (charset instanceof CharSet)
          chars.push(...charset.chars);
        else if (Array.isArray(charset))
          chars.push(...charset);
        else
          chars.push(charset);
      }
    );
    this.charset = new CharSet(chars);
  }

  abstract match(token: string): boolean;
}

class MinMaxRepeatedChar extends RepeatedChar {
  readonly minReps: number;
  readonly maxReps: number;
  constructor(
    minReps: number,
    maxReps: number,
    ...charsets: Array<RepeatedCharInput>
  ) {
    super(...charsets);
    if (
      minReps < 0
      || maxReps < 0
      || Number.isNaN(minReps)
      || Number.isNaN(maxReps)
    )
      minReps = maxReps = 0;

    if (minReps > maxReps) {
      const tmp: number = minReps;
      minReps = maxReps;
      maxReps = tmp;
    }

    if (!Number.isFinite(minReps))
      this.minReps = this.maxReps = 0;
    else {
      this.minReps = minReps;
      this.maxReps = maxReps;
    }
  }

  match(token: string): boolean {
    return token.length >= this.minReps
      && token.length <= this.maxReps
      && [...token].every(
        (char: string) => (
          this.charset.includes(char)
        )
      );
  }
}

class NRepeatedChar extends MinMaxRepeatedChar {
  constructor(
    reps: number,
    ...charsets: Array<RepeatedCharInput>
  ) {
    super(reps, reps, ...charsets);
  }

  get reps() {
    return this.minReps;
  }
}

class OneRepeatedChar extends NRepeatedChar {
  constructor(
    ...charsets: Array<RepeatedCharInput>
  ) {
    super(1, ...charsets);
  }
}

abstract class Gram {
  readonly word: string;
  constructor(
    word: string
  ) {
    this.word = word;
  }

  get length(): number {
    return this.word.length;
  }

  get string(): string {
    return this.word;
  }

  toString(): string {
    return this.string;
  }
}

class NGram extends Gram {
  readonly n: number;
  readonly remainder: string;
  constructor(
    text: string,
    n: number = 1,
    startIndex: number = 0
  ) {
    n = Number.isNaN(n)?
      1
      : Number.isFinite(n)?
        n >= 1 ?
          Math.round(n)
          : 1
        : n !== -Infinity ?
          Infinity
          : 1;
    super(
      n === Infinity ?
        text
        : text.length >= n ?
          text.slice(0, n)
          : String()
    );
    this.n = n;
    this.remainder = text
      .slice(this.word.length);
  }

  get isToken(): boolean {
    return this.word.length > 0;
  }

  get valid(): boolean {
    return this.isToken;
  }

  get deterministic(): boolean {
    return Number.isFinite(this.n);
  }

  get hasRemainder(): boolean {
    return this.remainder.length > 0;
  }
}

class OneGram extends NGram {
  constructor(
    text: string
  ) {

  }
}

class NGrams {

}

type StringValidatorInput = StringValidator
  | OneRepeatedChar
  | CharSetInput;

abstract class StringValidator {
  readonly raw: string;
  readonly patterns: Array<OneRepeatedChar>;
  readonly cleaned: string;
  constructor(
    text: string,
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
      },
    ...patterns: Array<StringValidatorInput>
  ) {
    this.raw = text;
    this.patterns = this
      .parsePatterns(...patterns);
    this.cleaned = this
      .clean(
        text,
        toLower,
        trim,
        trimLeading,
        trimTrailing
      );
  }

  private parsePatterns(
    ...patterns: Array<StringValidatorInput>
  ): Array<OneRepeatedChar> {
    const parsedPatterns: Array<OneRepeatedChar> = [];
    patterns.forEach(
      (pattern) => {
        if (pattern instanceof StringValidator)
          parsedPatterns.push(...pattern.patterns);
        else if (pattern instanceof OneRepeatedChar)
          parsedPatterns.push(pattern);
        else
          parsedPatterns.push(new OneRepeatedChar(pattern));
      }
    );
    return parsedPatterns;
  }

  private clean(
    text: string,
    toLower: boolean,
    trim: boolean,
    trimLeading: Array<string>,
    trimTrailing: Array<string>
  ): string {
    return postTrim(
      preTrim(
        trim ?
          toLower ?
            text.toLowerCase().trim()
            : text.trim()
          : toLower ?
            text.toLowerCase()
            : text
      )
    );

    function preTrim(
      text: string,
      wordsToTrim: string[]
    ): string {
      wordsToTrim
        .filter(
          (word: string) => (
            word.length > 0
          )
        )
        .forEach(
          (word: string) => {
            while(text.startsWith(word))
              text = text.slice(
                word.length
              );
          }
        );
      return text;
    }

    function postTrim(
      text: string,
      wordsToTrim: string[]
    ): string {
      wordsToTrim
        .filter(
          (word: string) => (
            word.length > 0
          )
        )
        .forEach(
          (word: string) => {
            while (text.endsWith(word))
              text = text.slice(
                0,
                0 - word.length
              );
          }
        );
      return text;
    }
  }

  get validated(): string {
    return this.isValid ?
      this.cleaned
      : String();
  }

  get isValid(): boolean {
    const allowedChars: string[] = this.patterns.map(
      (pattern: OneRepeatedChar): string[] => (
        pattern.charset.chars
      )
    ).flat(1);

    return this.tokens.every(
      (token: string) => (
        this.patterns.some(
          (pattern: OneRepeatedChar) => (
            pattern.match()
          )
        )
      )
    );
  }

  private get tokens(): string[] {
    return splitStringIntoTokens(
      this.cleaned,
      1
    );

    function splitStringIntoTokens(
      text: string,
      maxTokenLength: number
    ): string[] {
      return [...url];
    }
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
          UrlCharSet.slash,
          UrlCharSet.colon
        ]
      },
      UrlCharSet.alphaNumericLower,
      UrlCharSet.plus,
      UrlCharSet.dot,
      UrlCharSet.hyphen
    );
  }
}

class PortValidator extends UrlValidator {
  constructor(port: string) {
    super(
      port,
      {
        trimLeading: [
          UrlCharSet.colon,
          UrlCharSet.space
        ]
      },
      UrlCharSet.numbers
    );
  }
}

class FragmentValidator extends UrlValidator {
  constructor(fragment: string) {
    super(
      fragment,
      {
        trimLeading: [
          UrlCharSet.hash,
          UrlCharSet.space
        ]
      }
    );
  }
}

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

class _Scheme extends _UrlPart {
  constructor(
    scheme?: string | _Scheme
  ) {
    super(scheme);
  }

  protected parse(scheme: string): string {
    return new SchemeValidator(scheme)
      .validated;
  }
}

// WIP
class _Host extends _UrlPart {
  constructor(
    host?: string | _Host
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
    port?: string
      | number
      | _Port
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
    fragment?: string
      | _Fragment,
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

class Url {
  public readonly scheme: stringful;
  public readonly host: string;
  public readonly port: Nullable<posint>;
  private _path: stringful[] = [];
  private _query: Record<stringful, string> = {};
  private _fragment: string = "";

  constructor(
    base: string | Url,
    host?: string,
    port?: Nullable<number>,
    path?: string | string[],
    query?: string | Record<string, string>,
    fragment?: string,
  ) {
    try {
      (
        {
          scheme: this.scheme,
          host: this.host,
          port: this.port,
          _path: this[
            typeof base === "string"
              ? "path"
              : "_path"
          ],
          _query: this[
            typeof base === "string"
              ? "query"
              : "_query"
          ],
          _fragment: this[
            typeof base === "string"
              ? "fragment"
              : "_fragment"
          ],
        } = typeof base === "string"
          ? Url.parse(
              base,
            )
          : base
      );

      if (typeof host !== "undefined")
        this.host = host;
      if (typeof port !== "undefined")
        this.port = port === null
          ? null
          : Url.posint(
              port,
            );
      if (typeof path !== "undefined")
        this.path = path;
      if (typeof query !== "undefined")
        this.query = query;
      if (typeof fragment !== "undefined")
        this.fragment = fragment;
    }
    catch (e) {
      throw new EvalError(
        `Url: ctor`,
        { cause: e },
      );
    }
  }

  public get url(): stringful {
    try { // TBD
      return this.scheme;
    }
    catch (e) {
      throw new EvalError(
        `Url: url`,
        { cause: e },
      );
    }
  }

  public get path(): string {
    try {
      return this._path
        .join(
          "/",
        );
    }
    catch (e) {
      throw new EvalError(
        `Url: path`,
        { cause: e },
      );
    }
  }

  public get query(): string {
    try {
      return Object
        .entries(
          this._query,
        )
        .map(
          (entry: [string, string]): string =>
            entry
              .join(
                "=",
              ),
        )
        .join(
          "&",
        );
    }
    catch (e) {
      throw new EvalError(
        `Url: query`,
        { cause: e },
      );
    }
  }

  public get fragment(): string {
    try {
      return this._fragment;
    }
    catch (e) {
      throw new EvalError(
        `Url: fragment`,
        { cause: e },
      );
    }
  }

  public set path(
    path: string | string[],
  ) {
    try { // TBD
      if (typeof path === "string")
        this._path = [];
    }
    catch (e) {
      throw new EvalError(
        `Url: set path`,
        { cause: e },
      );
    }
  }

  public set query(
    query: string | Record<string, string>,
  ) {
    try { // TBD
      if (typeof query === "string")
        this._query = {};
    }
    catch (e) {
      throw new EvalError(
        `Url: set query`,
        { cause: e },
      );
    }
  }

  public set fragment(
    fragment: string,
  ) {
    try { // TBD
      this._fragment = fragment;
    }
    catch (e) {
      throw new EvalError(
        `Url: set fragment`,
        { cause: e },
      );
    }
  }

  protected static get stringful(): typeof Stringful {
    try {
      return importModule(
        "./common/types/literals/string/Stringful",
      ) as typeof Stringful;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: import Stringful`,
        { cause: e },
      );
    }
  }

  protected static get posint(): typeof PosInt {
    try {
      return importModule(
        "./common/types/literals/number/PosInt",
      ) as typeof PosInt;
    }
    catch (e) {
      throw new ReferenceError(
        `Url: import PosInt`,
        { cause: e },
      );
    }
  }

  private static parse(url: string): ParsedUrl {
    try { // TBD
      return {
        scheme: "foo" as stringful,
        host: url,
        port: null,
        _path: "",
        _query: "",
        _fragment: "",
      }
    }
    catch (e) {
      throw new EvalError(
        `Url: parse`,
        { cause: e },
      );
    }
  }

  public append(
    subpath: string | string[],
  ): this {
    try { // TBD
      if (typeof subpath === "string")
        this._path = [];

      return this;
    }
    catch (e) {
      throw new EvalError(
        `Url: append`,
        { cause: e },
      );
    }
  }

  public addQuery(
    params: string | Record<string, string>,
  ): this {
    try { // TBD
      if (typeof params === "string")
        this._query = {};

      return this;
    }
    catch (e) {
      throw new EvalError(
        `Url: addQuery`,
        { cause: e },
      );
    }
  }

  public toString(): stringful {
    try {
      return this.url;
    }
    catch (e) {
      throw new EvalError(
        `Url: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = Url;

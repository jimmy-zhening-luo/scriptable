class Callback {

  private readonly _rootUrl: Url;
  secretParamName?: Types.stringful;
  secret?: string;

  constructor(
    scheme: Types.stringful | Scheme,
    host: string | Host,
    secretParamName?: Types.stringful,
    secret?: string
  ) {
    this._rootUrl = new Callback._Url(
      scheme,
      host
    );
    if (secretParamName !== undefined) {
      this.secretParamName = secretParamName;
      this.secret = secret ?? "";
    }
  }

  get rootUrl(): Types.stringful {
    return this._rootUrl.toString();
  }

  get scheme(): Types.stringful {
    return this._rootUrl.scheme;
  }

  set scheme(
    scheme:
      | Types.stringful
      | Scheme
  ) {
    this._rootUrl.scheme = scheme;
  }

  get host(): string {
    return this._rootUrl.host;
  }

  set host(
    host:
      | string
      | Host
  ) {
    this._rootUrl.host = host;
  }

  request(
    path: string | Path,
    query:
      | string
      | Query
      | Record<string, string>
      | [string, string]
      | [string, string][]
  ): any {
    const cUrl: Url = new Callback._Url(this._rootUrl);
    cUrl.path = path;
    cUrl.query = query;
    if (this.secretParamName !== undefined
      && this.secret !== undefined
      && this.secret !== ""
    )
      cUrl.addParam(
        this.secretParamName,
        this.secret
      );
    return cUrl.xCallback;
  }

}

namespace Callback {

  export const _Url: typeof Url = importModule("Url");

}

module.exports = Callback;

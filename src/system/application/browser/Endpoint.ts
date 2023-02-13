class Endpoint {

  private readonly callbackBase: Callback;

  readonly subpath: Path;
  private readonly _baseQuery: Query;
  readonly requiredParams: Set<Types.stringful>;
  readonly optionalParams: Set<Types.stringful>;

  constructor(
    callbackBase: Callback,
    endpointSubpath:
      | string
      | Path = "",
    endpointQueryBase:
      | string
      | Query
      | [Types.stringful, string]
      | [Types.stringful, string][]
      | Map<string, string>
      | Record<string, string> = "",
    requiredParams:
      | Set<Types.stringful>
      | Types.stringful
      | Types.stringful[] = [],
    optionalParams:
      | Set<Types.stringful>
      | Types.stringful
      | Types.stringful[] = []
  ) {
    this.callbackBase = callbackBase;
    this.callbackBase
    this.subpath = new this.Path(
      endpointSubpath
    );
    this._baseQuery = new this.Query(
      endpointQueryBase
    );
    this.requiredParams = new Set(typeof requiredParams === "string" ?
      [requiredParams]
      : requiredParams);
    this.optionalParams = new Set(typeof optionalParams === "string" ?
      [optionalParams]
      : optionalParams);
  }

  get url(
    baseCallbackUrl: Url,
    params:
      | string
      | Query
      | [Types.stringful, string]
      | [Types.stringful, string][]
      | Map<string, string>
      | Record<string, string> = ""
  ): Url {
    return new this.Url(
      baseCallbackUrl
        .appendPath(this.subpath)
        .addParam(this.baseQuery)
        .addParam(new this.Query(
          Array.from(
            Object.entries(
              new this.Query(
                params
              ).queryMap
            )
          ).filter(([key, value]) =>
            this.requiredParams.has(key)
            || this.optionalParams.has(key)
          )
        ))
    );
  }

  get Callback(): typeof Callback {
    return Endpoint.Callback;
  }

  get Url(): typeof Url {
    return Endpoint.Url;
  }

  get Path(): typeof Path {
    return Endpoint.Path;
  }

  get Query(): typeof Query {
    return Endpoint.Query;
  }

  static get Callback(): typeof Callback {
    return importModule("Callback");
  }

  static get Url(): typeof Url {
    return Endpoint.Callback.Url;
  }

  static get Path(): typeof Path {
    return Endpoint.Url.Path;
  }

  static get Query(): typeof Query {
    return Endpoint.Url.Query;
  }

}

namespace Endpoint {

}

module.exports = Endpoint;

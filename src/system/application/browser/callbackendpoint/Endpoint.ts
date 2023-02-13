class Endpoint {
  
  readonly subpath: Path;
  private readonly _baseQuery: Query;
  readonly requiredParams: Set<Types.stringful>;
  readonly optionalParams: Set<Types.stringful>;
  
  constructor(
    endpointSubpath:
      | string
      | Path = "",
    baseQuery:
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
    this.subpath = new this.Path(
      endpointSubpath
    );
    this._baseQuery = new this.Query(
      baseQuery
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
  
}

namespace Endpoint {
  
}

module.exports = Endpoint;
class Endpoint {

  private readonly _callback: Callback;
  readonly requiredParams: Set<string>;
  readonly optionalParams: Set<string>;

  constructor(
    callbackBase: Callback,
    endpointSubpath: ConstructorParameters<typeof Path>[0] = "",
    endpointQueryBase: ConstructorParameters<typeof Query>[0] = "",
    requiredParams:
      | Set<string>
      | string
      | string[] = [],
    optionalParams:
      | Set<string>
      | string
      | string[] = []
  ) {
    this._callback = callbackBase;
    this._callback.appendBasePath(endpointSubpath);
    this._callback.addCommonParam(endpointQueryBase);
    this.requiredParams = new Set(typeof requiredParams === "string" ?
      [requiredParams]
      : requiredParams);
    this.optionalParams = new Set(typeof optionalParams === "string" ?
      [optionalParams]
      : optionalParams);
  }

  request(
    params: ConstructorParameters<typeof Query>[0] = "",
    subpath: ConstructorParameters<typeof Path>[0] = ""
  ): ReturnType<Callback["request"]> {
    const finalCallbackUrl: Url = new this.Url(
      this._callback
    )
      .appendPath(subpath)
      .addParam(params);

    if (Array.from(
      this
        .requiredParams
        .keys()
    ).every(key => finalCallbackUrl
      .hasParam(
        key
      )
    ))
      return this._callback.request(
        subpath,
        params
      );
    else
      return {};
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

module.exports = Endpoint;

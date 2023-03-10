class Endpoint {
  private readonly _callback: Callback;
  readonly requiredParams: Set<string>;
  readonly optionalParams: Set<string>;

  constructor(
    callbackBase: Callback,
    endpointSubpath: ConstructorParameters<typeof Path>[0] = "",
    endpointQueryBase: ConstructorParameters<typeof Query>[0] = "",
    requiredParams: Set<string> | string | string[] = [],
    optionalParams: Set<string> | string | string[] = [],
  ) {
    try {
      this._callback = callbackBase;
      this._callback.appendBasePath(endpointSubpath);
      this._callback.addCommonParam(endpointQueryBase);
      this.requiredParams = new Set(
        typeof requiredParams === "string" ? [requiredParams] : requiredParams,
      );
      this.optionalParams = new Set(
        typeof optionalParams === "string" ? [optionalParams] : optionalParams,
      );
    } catch (e) {
      throw new Error(`Endpoint: constructor: error creating Endpoint: \n${e}`);
    }
  }

  request(
    params: ConstructorParameters<typeof Query>[0] = "",
    subpath: ConstructorParameters<typeof Path>[0] = "",
  ): ReturnType<Callback["request"]> {
    try {
      const finalCallbackUrl: Url = new Endpoint.Url(this._callback)
        .append(subpath)
        .addParam(params);

      if (
        Array.from(this.requiredParams.keys()).every(key =>
          finalCallbackUrl.hasParam(key),
        )
      )
        return this._callback.request(subpath, params);
      else throw new Error("missing required params");
    } catch (e) {
      throw new Error(`Endpoint: request: error requesting Endpoint: \n${e}`);
    }
  }

  static get Callback(): typeof Callback {
    try {
      return importModule("Callback");
    } catch (e) {
      throw new ReferenceError(
        `Endpoint: Callback: error getting Callback: \n${e}`,
      );
    }
  }

  static get Url(): typeof Url {
    try {
      return Endpoint.Callback.Url;
    } catch (e) {
      throw new ReferenceError(`Endpoint: Url: error getting Url: \n${e}`);
    }
  }

  static get Path(): typeof Path {
    try {
      return Endpoint.Url.Path;
    } catch (e) {
      throw new ReferenceError(`Endpoint: Path: error getting Path: \n${e}`);
    }
  }

  static get Query(): typeof Query {
    try {
      return Endpoint.Url.Query;
    } catch (e) {
      throw new ReferenceError(`Endpoint: Query: error getting Query: \n${e}`);
    }
  }
}

module.exports = Endpoint;

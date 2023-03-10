class Callback {
  private readonly _baseUrl: Url;

  constructor(
    schemeOrCallback: string | Scheme | Callback,
    host: ConstructorParameters<typeof Host>[0] = "",
    basePath: ConstructorParameters<typeof Path>[0] = "",
    commonParams: ConstructorParameters<typeof Query>[0] = "",
  ) {
    try {
      if (schemeOrCallback instanceof Callback)
        this._baseUrl = new Url(schemeOrCallback.baseUrl);
      else
        this._baseUrl = new Callback.Url(
          schemeOrCallback,
          host,
          undefined,
          basePath,
          new Callback.Query(commonParams),
        );
    } catch (e) {
      throw new Error(`Callback: constructor: error creating Callback: \n${e}`);
    }
  }

  get baseUrl(): string {
    try {
      return this._baseUrl.toString();
    } catch (e) {
      throw new Error(`Callback: get baseUrl: error getting baseUrl: \n${e}`);
    }
  }

  get scheme(): string {
    try {
      return this._baseUrl.scheme;
    } catch (e) {
      throw new Error(`Callback: get scheme: error getting scheme: \n${e}`);
    }
  }

  set scheme(scheme: ConstructorParameters<typeof Scheme>[0]) {
    try {
      this._baseUrl.scheme = scheme;
    } catch (e) {
      throw new Error(`Callback: set scheme: error setting scheme: \n${e}`);
    }
  }

  get host(): string {
    try {
      return this._baseUrl.host;
    } catch (e) {
      throw new Error(`Callback: get host: error getting host: \n${e}`);
    }
  }

  set host(host: ConstructorParameters<typeof Host>[0]) {
    try {
      this._baseUrl.host = host;
    } catch (e) {
      throw new Error(`Callback: set host: error setting host: \n${e}`);
    }
  }

  get basePath(): string {
    try {
      return this._baseUrl.path;
    } catch (e) {
      throw new Error(`Callback: get basePath: error getting basePath: \n${e}`);
    }
  }

  set basePath(path: ConstructorParameters<typeof Path>[0]) {
    try {
      this._baseUrl.path = path;
    } catch (e) {
      throw new Error(`Callback: set basePath: error setting basePath: \n${e}`);
    }
  }

  appendBasePath(...path: Parameters<Url["append"]>): this {
    try {
      this._baseUrl.append(...path);
      return this;
    } catch (e) {
      throw new Error(
        `Callback: appendBasePath: error appending basePath: \n${e}`,
      );
    }
  }

  get commonParams(): typeof Callback.prototype.commonParamMap {
    try {
      return this.commonParamMap;
    } catch (e) {
      throw new Error(
        `Callback: get commonParams: error getting commonParams: \n${e}`,
      );
    }
  }

  get commonQuery(): typeof Url.prototype.query {
    try {
      return this._baseUrl.query;
    } catch (e) {
      throw new Error(
        `Callback: get commonQuery: error getting commonQuery: \n${e}`,
      );
    }
  }

  get commonParamTuples(): typeof Url.prototype.queryTuples {
    try {
      return this._baseUrl.queryTuples;
    } catch (e) {
      throw new Error(
        `Callback: get commonParamTuples: error getting commonParamTuples: \n${e}`,
      );
    }
  }

  get commonParamMap(): typeof Url.prototype.queryMap {
    try {
      return this._baseUrl.queryMap;
    } catch (e) {
      throw new Error(
        `Callback: get commonParamMap: error getting commonParamMap: \n${e}`,
      );
    }
  }

  set commonParams(params: ConstructorParameters<typeof Query>[0]) {
    try {
      this._baseUrl.query = params;
    } catch (e) {
      throw new Error(
        `Callback: set commonParams: error setting commonParams: \n${e}`,
      );
    }
  }

  addCommonParam(...params: Parameters<Url["addParam"]>): this {
    try {
      this._baseUrl.addParam(...params);
      return this;
    } catch (e) {
      throw new Error(
        `Callback: addCommonParam: error adding commonParam: \n${e}`,
      );
    }
  }

  deleteCommonParam(...keys: Parameters<Url["deleteParam"]>): this {
    try {
      this._baseUrl.deleteParam(...keys);
      return this;
    } catch (e) {
      throw new Error(
        `Callback: deleteCommonParam: error deleting commonParam: \n${e}`,
      );
    }
  }

  getCommonParam(
    ...key: Parameters<Url["getParam"]>
  ): ReturnType<Url["getParam"]> {
    try {
      return this._baseUrl.getParam(...key);
    } catch (e) {
      throw new Error(
        `Callback: getCommonParam: error getting commonParam: \n${e}`,
      );
    }
  }

  hasCommonParam(
    ...key: Parameters<Url["hasParam"]>
  ): ReturnType<Url["hasParam"]> {
    try {
      return this._baseUrl.hasParam(...key);
    } catch (e) {
      throw new Error(
        `Callback: hasCommonParam: error checking commonParam: \n${e}`,
      );
    }
  }

  request(
    path: ConstructorParameters<typeof Path>[0] = "",
    query: ConstructorParameters<typeof Query>[0] = "",
    attachCommonParams: boolean = true,
    overrideCommonParams: boolean = true,
  ): ReturnType<Url["xCallback"]> {
    try {
      const cUrl: Url = new Callback.Url(this._baseUrl);
      cUrl.append(path);
      if (attachCommonParams) {
        if (overrideCommonParams) cUrl.addParam(query);
        else {
          const commonQuery: string = cUrl.query;
          cUrl.query = query;
          cUrl.addParam(commonQuery);
        }
      } else {
        cUrl.query = "";
        cUrl.query = query;
      }
      return cUrl.xCallback();
    } catch (e) {
      throw new Error(`Callback: request: error making request: \n${e}`);
    }
  }

  toString(): string {
    try {
      return this.baseUrl;
    } catch (e) {
      throw new Error(`Callback: toString: error converting to string: \n${e}`);
    }
  }

  static get Url(): typeof Url {
    try {
      return importModule("Url");
    } catch (e) {
      throw new ReferenceError(
        `Callback: get Url: error loading Url module: \n${e}`,
      );
    }
  }

  static get Query(): typeof Query {
    try {
      return Callback.Url.Query;
    } catch (e) {
      throw new ReferenceError(
        `Callback: get Query: error loading Query module: \n${e}`,
      );
    }
  }
}

module.exports = Callback;

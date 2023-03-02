const po_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Port extends po_UrlPart {
  constructor(port?: null | string | number | Port) {
    try {
      super(
        typeof port === "number"
          ? Number.isInteger(port)
            ? String(Math.trunc(port))
            : null
          : port,
      );
    } catch (e) {
      throw new Error(`Port: constructor: error creating Port: ${e}`);
    }
  }

  protected parse(port: string): null | string {
    try {
      const parsedString: string = new this.ValidPort(port).toString();
      const parsedInt: number = Number.isInteger(Number.parseInt(parsedString))
        ? Math.round(Number.parseInt(parsedString))
        : NaN;
      return parsedInt >= 1 && parsedInt <= 65535
        ? String(Math.round(parsedInt)).trim()
        : null;
    } catch (e) {
      throw new Error(`Port: parse: error parsing Port: ${e}`);
    }
  }

  toNumber(coerceEmptyPortToZero: boolean = false): number {
    try {
      return this.isValid
        ? Math.abs(Math.round(Number.parseInt(this.toString())))
        : coerceEmptyPortToZero
        ? 0
        : NaN;
    } catch (e) {
      throw new Error(`Port: toNumber: error converting Port to number: ${e}`);
    }
  }

  protected get ValidPort(): typeof ValidPort {
    try {
      return this.UrlValidators.Port;
    } catch (e) {
      throw new ReferenceError(`Port: error loading ValidPort module: ${e}`);
    }
  }

  static get UrlPart(): typeof UrlPart {
    try {
      return po_UrlPart;
    } catch (e) {
      throw new ReferenceError(`Port: error loading UrlPart module: ${e}`);
    }
  }
}

module.exports = Port;

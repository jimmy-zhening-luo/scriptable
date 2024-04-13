const po_UrlPart: typeof UrlPart = importModule(
  "urlpart/UrlPart",
) as typeof UrlPart;

class UrlPort extends po_UrlPart {
  constructor(port?: string | number | UrlPort) {
    try {
      super(
        typeof port === "number"
          ? Number.isInteger(port)
            ? String(Math.round(port))
            : ""
          : port,
      );
    }
    catch (e) {
      throw new Error(`UrlPort: constructor: error creating UrlPort: \n${e as string}`);
    }
  }

  public static get ValidPort(): typeof ValidPort {
    try {
      return UrlPort.UrlValidators.Port;
    }
    catch (e) {
      throw new ReferenceError(`UrlPort: error loading module: \n${e as string}`);
    }
  }

  public static get UrlPart(): typeof UrlPart {
    try {
      return po_UrlPart;
    }
    catch (e) {
      throw new ReferenceError(`UrlPort: error loading module: \n${e as string}`);
    }
  }

  public toNumber(coerceEmptyPortToZero: boolean = false): number {
    try {
      return this.isValid
        ? Math.abs(Math.round(Number.parseInt(this.toString())))
        : coerceEmptyPortToZero
          ? 0
          : NaN;
    }
    catch (e) {
      throw new Error(
        `UrlPort: toNumber: error converting UrlPort to number: \n${e as string}`,
      );
    }
  }

  protected parse(port: string): null | string {
    try {
      const parsedPortString: string = new UrlPort.ValidPort(port)
        .toString();
      const parsedPortInt: number = Number.isInteger(
        Number.parseInt(parsedPortString),
      )
        ? Math.round(Number.parseInt(parsedPortString))
        : NaN;

      return parsedPortInt >= 1 && parsedPortInt <= 65535
        ? String(Math.round(parsedPortInt))
        : null;
    }
    catch (e) {
      throw new Error(`UrlPort: parse: error parsing UrlPort: \n${e as string}`);
    }
  }
}

module.exports = UrlPort;

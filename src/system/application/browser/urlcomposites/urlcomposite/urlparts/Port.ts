const po_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

class Port extends po_UrlPart {
  constructor(port?: null | string | number | Port) {
    super(
      typeof port === "number"
        ? Number.isInteger(port)
          ? String(Math.trunc(port))
          : null
        : port,
    );
  }

  protected parse(port: string): null | string {
    const parsedString: string = new this.ValidPort(port).toString();
    const parsedInt: number = Number.isInteger(Number.parseInt(parsedString))
      ? Math.round(Number.parseInt(parsedString))
      : NaN;
    return parsedInt >= 1 && parsedInt <= 65535
      ? String(Math.round(parsedInt)).trim()
      : null;
  }

  toNumber(coerceEmptyPortToZero: boolean = false): number {
    return this.isValid
      ? Math.abs(Math.round(Number.parseInt(this.toString())))
      : coerceEmptyPortToZero
      ? 0
      : NaN;
  }

  protected get ValidPort(): typeof ValidPort {
    return this.UrlValidators.Port;
  }

  static get UrlPart(): typeof UrlPart {
    return po_UrlPart;
  }
}

module.exports = Port;

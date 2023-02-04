const po_UrlPart: typeof UrlPart = importModule("urlpart/UrlPart");

// WIP
class Port extends po_UrlPart {
  constructor(
    port?: string
      | number
      | Port
  ) {
    super(
      typeof port === "number" ?
        Number.isInteger(port) ?
          String(Math.trunc(port))
          : String()
        : port
    );
  }

  protected parse(
    port: string
  ): string {
    const parsedString: string = new PortValidator(port)
      .toString();
    const parsedInt: number = Number.isInteger(
      Number.parseInt(parsedString)
    ) ?
      Math.round(Number.parseInt(parsedString))
      : 0;
    return (
      parsedInt >= 1
      && parsedInt <= 65535
    ) ?
      String(Math.round(parsedInt)).trim()
      : String();
  }

  get number(): number {
    return (this.string === String()) ?
      0
      : Math.abs(Math.round(Number.parseInt(this.string)));
  }

  toNumber(
    coerceEmptyPortToNull: boolean = false
  ): null | number {
    const zeroValue: null | number = coerceEmptyPortToNull ?
      null
      : 0;
    return this.number === 0 ?
      zeroValue
      : this.number;
  }
}

namespace Port {
  export const _ValidPort: typeof ValidPort = importModule("validators/ValidPort");
}

module.exports = Port;

class DateTime {
  protected readonly _date: Date;

  constructor(
    date: Date | DateTime = new Date(),
    offset: number = 0,
    offsetUnit: keyof typeof TimeUnit = "day",
  ) {
    this._date = new Date(
      DateTime
        .getOffsetMs(
          offset,
          offsetUnit,
        ) + (
        date instanceof Date
          ? date
          : date._date
      )
        .getTime(),
    );
  }

  public static get TimeUnit(): typeof TimeUnit {
    return importModule("./unit/TimeUnit") as typeof TimeUnit;
  }

  public get date(): Date {
    return this._date;
  }

  private get epoch(): number {
    return this._date.getTime();
  }

  private static getOffsetMs(
    offset: number,
    offsetUnit: keyof typeof TimeUnit,
  ): number {
    return offset * this.TimeUnit[offsetUnit];
  }

  public increment(
    offset: number,
    offsetUnit: keyof typeof TimeUnit = "day",
  ): DateTime {
    return new DateTime(
      this,
      offset,
      offsetUnit,
    );
  }

  public decrement(
    offset: number,
    offsetUnit: keyof typeof TimeUnit = "day",
  ): DateTime {
    return this.increment(
      -offset,
      offsetUnit,
    );
  }

  public until(
    futureDate: Date | DateTime,
    unit: keyof typeof TimeUnit = "day",
  ): number {
    return (
      new DateTime(futureDate).epoch - this.epoch
    ) / DateTime.TimeUnit[unit];
  }

  public after(
    pastDate: Date | DateTime,
    unit: keyof typeof TimeUnit = "day",
  ): number {
    return (
      this.epoch - new DateTime(pastDate).epoch
    ) / DateTime.TimeUnit[unit];
  }
}

module.exports = DateTime;

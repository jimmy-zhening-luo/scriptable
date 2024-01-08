class DateTime {
  protected _date: Date;

  constructor(date: Date | DateTime) {
    this._date = date instanceof Date
      ? date
      : date._date;
  }

  public get TimeUnit(): typeof TimeUnit {
    return importModule("./unit/TimeUnit") as typeof TimeUnit;
  }

  private get timeStamp(): number {
    return this._date.getTime();
  }

  public timeUntil(
    futureDate: Date | DateTime,
    unit: keyof typeof TimeUnit,
  ): number {
    return (
      new DateTime(futureDate).timeStamp - this.timeStamp
    ) / this.TimeUnit[unit];
  }
}

module.exports = DateTime;

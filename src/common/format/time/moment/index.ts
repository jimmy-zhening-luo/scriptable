abstract class Moment {
  protected abstract separator: string;
  protected abstract dateFormat: Table;
  protected abstract timeFormat: Table;

  constructor(public readonly moment = new Date) {}

  public get datetime() {
    const {
      date,
      time,
      separator,
    } = this;

    return [date, time].join(separator);
  }

  public get date() {
    try {
      const { moment, dateFormat } = this;

      return this.postdate(
        moment.toLocaleDateString(
          `en-US`,
          dateFormat,
        ),
      );
    }
    catch (e) {
      throw new SyntaxError(
        `Moment: date`,
        { cause: e },
      );
    }
  }

  public get time() {
    const { localtime, offset } = this;

    return [localtime, offset].join("");
  }

  public get localtime() {
    try {
      const { moment, timeFormat } = this;

      return this.postlocal(
        moment.toLocaleTimeString(
          `en-US`,
          timeFormat,
        ),
      );
    }
    catch (e) {
      throw new SyntaxError(
        `Moment: localtime`,
        { cause: e },
      );
    }
  }

  public get offset() {
    try {
      const offset = this.moment.getTimezoneOffset() / -60;

      return offset.toLocaleString(
        "en-US",
        {
          signDisplay: "always",
          minimumIntegerDigits: 2,
          maximumFractionDigits: 1,
        },
      );
    }
    catch (e) {
      throw new SyntaxError(
        `Moment: offset`,
        { cause: e },
      );
    }
  }

  public toString() {
    return this.datetime;
  }

  protected abstract postdate(date: string): string;
  protected abstract postlocal(localtime: string): string;
}

module.exports = Moment;

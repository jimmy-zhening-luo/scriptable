abstract class Moment {
  protected abstract separator: string;
  protected abstract dateFormat: Table;
  protected abstract timeFormat: Table;

  constructor(public readonly moment = new Date) {}

  public get epoch(): Positive<fint> {
    return this.moment.getTime() as Positive<fint>;
  }

  public get datetime() {
    const {
        date,
        time,
        separator,
      } = this,
      datetime = [date, time] as const satisfies Tuple<stringful>;

    return datetime.join(separator) as stringful;
  }

  public get date() {
    try {
      const { moment, dateFormat } = this,
        date = moment.toLocaleDateString(
            `en-US`,
            dateFormat,
          ),
        postdate = this.postdate(date);

      if (postdate.length > 0)
        return postdate as stringful;
      else if (date.length > 0)
        throw new SyntaxError(
          `Postprocessor empties formatted date`,
          { cause: { date, postdate } },
        );
      else
        throw new SyntaxError(
          `Date formatter creates empty date`,
          { cause: dateFormat }
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
    const { localtime, offset } = this,
      localOffset = [localtime, offset] as const satisfies [stringful, string];

    return localOffset.join("") as stringful;
  }

  public get localtime() {
    try {
      const { moment, timeFormat } = this,
        localtime = moment.toLocaleTimeString(
            `en-US`,
            timeFormat,
          ),
        postlocal = this.postlocal(localtime);

      if (postlocal.length > 0)
        return postlocal as stringful;
      else if (localtime.length > 0)
        throw new SyntaxError(
          `Postprocessor empties formatted localtime time`,
          { cause: { localtime, postlocal } },
        );
      else
        throw new SyntaxError(
          `Time formatter creates empty localtime time`,
          { cause: timeFormat }
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

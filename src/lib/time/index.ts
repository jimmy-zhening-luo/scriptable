export default class Time {
  private readonly date;

  constructor(
    date: (
      | Date
      | number
    ) = new Date,
  ) {
    try {
      this.date = typeof date === "number"
        ? new Date(date)
        : date;

      if (Number.isNaN(this.epoch))
        throw new RangeError("Invalid Date object");
    }
    catch (e) {
      throw new Error(
        "Failed to construct Time",
        { cause: e },
      );
    }
  }

  public get epoch() {
    return this
      .date
      .getTime();
  }

  public get midnight() {
    return this.at(0);
  }

  public get noon() {
    return this.at(12);
  }

  public get am() {
    return this.epoch < this.noon.epoch;
  }

  public get pm() {
    return !this.am;
  }

  public toDate() {
    return new Date(this.epoch);
  }

  public print(
    format = "MMMM d, y h:mm:ss a",
  ) {
    try {
      (this.printer ??= new DateFormatter)
        .dateFormat = format;

      return this
        .printer
        .string(
          this.date,
        );
    }
    catch (e) {
      throw new SyntaxError(
        "Failed to print Time to format: " + format,
        { cause: e },
      );
    }
  }

  public at(
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  ) {
    try {
      return new Time(
        this
          .toDate()
          .setHours(
            hour,
            minute,
            second,
            millisecond,
          ),
      );
    }
    catch (e) {
      throw new RangeError(
        "Failed to get Time at: " + [
          hour,
          minute,
          second,
          millisecond,
        ]
          .map(unit => String(unit))
          .join(":"),
        { cause: e },
      );
    }
  }

  public in(
    {
      hours = 0,
      minutes = 0,
      seconds = 0,
    } = {},
  ) {
    try {
      return new Time(
        this.epoch
        + hours * 3_600_000
        + minutes * 60_000
        + seconds * 1_000,
      );
    }
    catch (e) {
      throw new RangeError(
        "Failed to get Time in: " + [
          hours,
          minutes,
          seconds,
        ]
          .map(unit => String(unit))
          .join(":"),
        { cause: e },
      );
    }
  }

  public ago(
    {
      hours = 0,
      minutes = 0,
      seconds = 0,
    } = {},
  ) {
    return this.in(
      {
        hours: -hours,
        minutes: -minutes,
        seconds: -seconds,
      },
    );
  }

  public offset(
    timeZone: Null<string> = null,
  ) {
    const fromUTC = this
      .date
      .getTimezoneOffset() / -60;

    if (timeZone === null)
      return fromUTC;

    const [
      sign,
      H1,
      H2,,
      m1,
      m2,
    ] = new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone,
        timeZoneName: "longOffset",
      },
    )
      .formatToParts()
      .find(part => part.type === "timeZoneName")!
      .value
      .slice(3) as unknown as Hexad<char>;

    return Number(`${sign}1`)
      * (
        Number(`${H1}${H2}`)
        + Number(`${m1}${m2}`) / 60
      );
  }

  private printer?: DateFormatter;
}

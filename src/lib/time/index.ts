import type { Timezone } from "./timezone";

export default class Time {
  public readonly epoch;

  constructor(date: number | Date = new Date) {
    this.epoch = new Date(date).getTime();

    if (!Number.isFinite(this.epoch))
      throw new RangeError(
        "Invalid timestamp",
        { cause: date },
      );
  }

  public get midnight() {
    return this.at(0);
  }

  public get noon() {
    return this.at(12);
  }

  public since(time: Time) {
    return this.epoch - time.epoch;
  }

  public until(time: Time) {
    return time.epoch - this.epoch;
  }

  public toDate() {
    return new Date(this.epoch);
  }

  public at(
    hour = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  ) {
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

  public in(
    {
      hours = 0,
      minutes = 0,
      seconds = 0,
    } = {},
  ) {
    return new Time(
      this.epoch
      + hours * 3_600_000
      + minutes * 60_000
      + seconds * 1_000,
    );
  }

  public ago(
    {
      hours = 0,
      minutes = 0,
      seconds = 0,
    } = {},
  ) {
    return this.in({
      hours: -hours,
      minutes: -minutes,
      seconds: -seconds,
    });
  }

  public offset(timeZone: Null<Timezone> = null) {
    const fromUTC = this
      .toDate()
      .getTimezoneOffset() / -60;

    if (timeZone === null)
      return fromUTC;

    const [
      sign,
      H0,
      H1,,
      m0,
      m1,
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
        Number(H0 + H1)
        + Number(m0 + m1) / 60
      );
  }

  public print(format = "MMMM d, y h:mm:ss a") {
    (this.printer ??= new DateFormatter)
      .dateFormat = format;

    return this
      .printer
      .string(this.toDate());
  }

  private printer?: DateFormatter;
}

import type { Timezone } from "./timezone";

export default class Time {
  public readonly epoch: number;

  constructor(
    date:
      | number
      | string
      | Date
      | Time
    = new Date,
  ) {
    if (
      typeof date === "object"
      && "epoch" in date
    )
      this.epoch = date.epoch;
    else {
      const epoch = new Date(date).getTime();

      if (!Number.isFinite(epoch))
        throw new RangeError(
          "Invalid timestamp",
          { cause: date },
        );

      this.epoch = epoch;
    }
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

  public until(...time: Parameters<Time["since"]>) {
    return -this.since(...time);
  }

  public in(
    hours = 0,
    minutes = 0,
    seconds = 0,
  ) {
    return new Time(
      this.epoch
      + hours * 3_600_000
      + minutes * 60_000
      + seconds * 1_000,
    );
  }

  public ago(
    hours = 0,
    minutes = 0,
    seconds = 0,
  ) {
    return this.in(
      -hours,
      -minutes,
      -seconds,
    );
  }

  public at(
    timeOrHour:
      | number
      | string
    = 0,
    minute = 0,
    second = 0,
  ) {
    return new Time(
      typeof timeOrHour === "number"
        ? this
            .toDate()
            .setHours(
              timeOrHour,
              minute,
              second,
            )
        : [
            this
              .toDate()
              .toDateString(),
            timeOrHour,
          ]
            .join(" "),
    );
  }

  public past(...time: Parameters<Time["at"]>) {
    return this > this.at(...time);
  }

  public offset(timeZone: Null<Timezone> = null) {
    if (timeZone === null)
      return this
        .toDate()
        .getTimezoneOffset() / -60;

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
      .find(
        part => part.type === "timeZoneName",
      )!
      .value
      .slice(3) as unknown as Hexad<char>;

    return Number(`${sign}1`)
      * (Number(H0 + H1) + Number(m0 + m1) / 60);
  }

  public toDate() {
    return new Date(this.epoch);
  }

  public [Symbol.toPrimitive](hint: string) {
    return hint === "number"
      ? this.epoch
      : this.print();
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

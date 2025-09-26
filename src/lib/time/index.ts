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
        throw RangeError(
          "Invalid time",
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

  public get eod() {
    return this.at(
      23,
      59,
      59,
    );
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
    time: number | string = 0,
    minute = 0,
    second = 0,
  ) {
    return new Time(
      typeof time === "number"
        ? this
            .toDate()
            .setHours(
              time,
              minute,
              second,
            )
        : this
            .toDate()
            .toDateString()
            .concat(
              " ",
              time,
            ),

    );
  }

  public offset(timeZone: Null<Timezone> = null) {
    const fromUTC = this.toDate().getTimezoneOffset() / -60;

    if (timeZone === null)
      return fromUTC;
    else {
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

      return fromUTC - Number(
        sign.concat(
          (
            Number(H0.concat(H1))
            + Number(m0.concat(m1))
            / 60
          )
            .toFixed(1),
        ),
      );
    }
  }

  public toDate() {
    return new Date(this.epoch);
  }

  public [Symbol.toPrimitive](hint: string) {
    return hint === "string"
      ? this.print()
      : this.epoch;
  }

  public print(format = "MMMM d, y h:mm:ss a") {
    (this.printer ??= new DateFormatter)
      .dateFormat = format;

    return this.printer.string(this.toDate());
  }

  private printer?: DateFormatter;
}

import type { Dateful } from "./dateful";
import type { Timezone } from "./timezone";

const enum Unit {
  millisecond = 1,
  second = 1e3,
  minute = 6e4,
  hour = 36e5,
  day = 864e5,
}

export default class Time {
  public readonly epoch: integerful;

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
      const epoch = new Date(date).getTime() as integer;

      if (Number.isNaN(epoch))
        throw RangeError(
          "Invalid time",
          { cause: date },
        );

      this.epoch = epoch as typeof epoch & numberful;
    }
  }

  public get today() {
    return this.midnight.epoch === new Time().midnight.epoch;
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
      999,
    );
  }

  public get tomorrow() {
    const date = this.date();

    return new Time(
      date.setDate(
        date.getDate() + 1,
      ),
    )
      .midnight;
  }

  public in(
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  ) {
    return new Time(
      this.epoch
      + hours * Unit.hour
      + minutes * Unit.minute
      + seconds * Unit.second
      + milliseconds,
    );
  }

  public ago(
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  ) {
    return this.in(
      -hours,
      -minutes,
      -seconds,
      -milliseconds,
    );
  }

  public at(
    time: number | string = 0,
    minute = 0,
    second = 0,
    millisecond = 0,
  ) {
    return new Time(
      typeof time === "number"
        ? this
            .date()
            .setHours(
              time,
              minute,
              second,
              millisecond,
            )
        : this.date().toDateString()
          + " at "
          + time,
    );
  }

  public since(
    date: ConstructorParameters<typeof Time>[0] = new Time,
    unit: keyof typeof Unit = "hour",
  ) {
    const then = new Time(date);

    if (unit === "day")
      return Math.round(
        (
          this.midnight.epoch - then.midnight.epoch
        ) / Unit.day,
      );

    const delta = this.epoch - then.epoch;

    switch (unit) {
    case "hour":
      return delta / Unit.hour;
    case "minute":
      return delta / Unit.minute;
    case "second":
      return delta / Unit.second;
    default:
      return delta;
    }
  }

  public until(
    date?: Parameters<Time["since"]>[0],
    unit?: Parameters<Time["since"]>[1],
  ) {
    return -this.since(date, unit);
  }

  public offset(destination: Null<Timezone> = null) {
    const local = this
      .date()
      .getTimezoneOffset() / -60;

    if (destination === null)
      return local as finiteful;

    const intl = new Intl.DateTimeFormat(
      "en-US",
      {
        timeZone: destination,
        timeZoneName: "longOffset",
      },
    )
      .formatToParts()
      .find(part => part.type === "timeZoneName")!
      .value,
    hours = Number(intl.slice(3, 6)),
    minutes = Number(intl.slice(7, 9)) / 60;

    return local - hours - (
      hours < 0
        ? -minutes
        : minutes
    ) as finiteful;
  }

  public date() {
    return new Date(this.epoch) as Dateful;
  }

  public [Symbol.toPrimitive](hint: string) {
    switch (hint) {
    case "string":
      return this.print();
    default:
      return this.epoch;
    }
  }

  public valueOf() {
    return this.epoch;
  }

  public print(format = "MMM d, y 'at' h:mm:ss a") {
    (Time.printer ??= new DateFormatter)
      .dateFormat = format;

    return Time.printer.string(this.date());
  }

  public time(
    {
      icon = "",
      ampm = "\u2005" as string | false,
      colon = true,
      seconds = false,
      zero = false,
      block = false,
      single = false,
    } = {},
  ) {
    const hms = this.print(
      (ampm === false ? "HH" : "h")
      + ":mm"
      + (seconds ? ":ss" : ""),
    ),
    digits = (
      zero
        ? hms
            .replace(/:00$/u, "")
            .replace(/:00$/u, "")
        : hms
    )
      .replaceAll(":", colon ? ":" : "");

    if (ampm === false)
      return icon + digits;

    const a = single
      ? this.print("a").at(0)!
      : this.print("a");

    return icon
      + digits
      + ampm
      + (
        block
          ? a
              .replace("A", "\u1D00")
              .replace("P", "\u1D18")
              .replace("M", "\u1D0D")
          : a
      );
  }

  private static printer?: DateFormatter;
}

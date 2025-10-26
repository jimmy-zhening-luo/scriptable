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
        : this
            .date()
            .toDateString()
            .concat(
              " at ",
              time,
            ),
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
    else {
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
    else {
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
  }

  public date() {
    return new Date(this.epoch) as Dateful;
  }

  public [Symbol.toPrimitive](hint: string) {
    return hint === "string"
      ? this.print()
      : this.epoch;
  }

  public print(format = "MMM d, y 'at' h:mm:ss a") {
    (this.printer ??= new DateFormatter)
      .dateFormat = format;

    return this.printer.string(this.date());
  }

  private printer?: DateFormatter;
}

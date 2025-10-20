import type { Timezone } from "./timezone";

const enum Unit {
  Hour = 3_600_000,
  Minute = 60_000,
  Second = 1_000,
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
    const date = this.toDate();

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
      + hours * Unit.Hour
      + minutes * Unit.Minute
      + seconds * Unit.Second
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
            .toDate()
            .setHours(
              time,
              minute,
              second,
              millisecond,
            )
        : this
            .toDate()
            .toDateString()
            .concat(
              " at ",
              time,
            ),
    );
  }

  public offset(destination: Null<Timezone> = null) {
    const local = this
      .toDate()
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

      return local - (
        hours < 0
          ? hours - minutes
          : hours + minutes
      ) as finiteful;
    }
  }

  public toDate() {
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

    return this.printer.string(this.toDate());
  }

  private printer?: DateFormatter;
}

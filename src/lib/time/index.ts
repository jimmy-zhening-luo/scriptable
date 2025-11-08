import type { Dateful } from "./dateful";
import type { Timezone } from "./timezone";

const enum Per {
  Day = 24,
  Hour = 60,
  Minute = Hour,
  Second = 1e3,
}

const enum Max {
  Hour = Per.Day - 1,
  Minute = Per.Hour - 1,
  Second = Per.Minute - 1,
  Millisecond = Per.Second - 1,
}

const enum Unit {
  millisecond = 1,
  second = millisecond * Per.Second,
  minute = second * Per.Minute,
  hour = minute * Per.Hour,
  day = hour * Per.Day,
}

const enum At {
  Midnight,
  Noon = 12,
}

const enum In {
  Now,
  Next,
}

declare namespace Print {
  const enum Break {
    None = "",
    Space = " ",
    Time = ":",
    Date = "," + Space,
    DateTime = Space + "'at'" + Space,
  }

  const enum Time {
    HourLong = "HH",
    Hour = "h",
    Minute = "mm",
    Second = "ss",
    AMPM = "a",
    Hm = HourLong + Break.Time + Minute,
    hm = Hour + Break.Time + Minute,
    Hms = Hm + Break.Time + Second,
    hms = hm + Break.Time + Second,
    hma = hm + Break.Space + AMPM,
    hmsa = hms + Break.Space + AMPM,
  }

  const enum Date {
    Month = "MMM",
    Day = "d",
    Year = "y",
    Date = Month + Break.Space + Day + Break.Date + Year,
    TimeShort = Time.hms,
    TimeLong = Time.hmsa,
    DateTime = Date + Break.DateTime + TimeLong,
    
  }
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
    return this.at(At.Midnight);
  }

  public get noon() {
    return this.at(At.Noon);
  }

  public get eod() {
    return this.at(
      Max.Hour,
      Max.Minute,
      Max.Second,
      Max.Millisecond,
    );
  }

  public get tomorrow() {
    const date = this.date();

    return new Time(
      date.setDate(
        date.getDate() + In.Next,
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
      .getTimezoneOffset() / -Per.Hour;

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
    minutes = Number(intl.slice(7, 9)) / Per.Hour;

    return local - hours - (
      hours < 0
        ? -minutes
        : minutes
    ) as finiteful;
  }

  public date() {
    return new Date(this.epoch) as Dateful;
  }

  public [Symbol.toPrimitive](hint: toPrimitive) {
    return hint === "string"
      ? this.print()
      : this.epoch;
  }

  public valueOf() {
    return this.epoch;
  }

  public print(
    format: string = Print.Date.DateTime,
  ) {
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
      ampm === false
        ? seconds
          ? Print.Time.Hms
          : Print.Time.Hm
        : seconds
          ? Print.Time.hms
          : Print.Time.hm,
    ),
    digits = (
      zero
        ? hms
            .replace(/:00$/u, Print.Break.None)
            .replace(/:00$/u, Print.Break.None)
        : hms
    )
      .replaceAll(
        Print.Break.Time,
        colon
          ? Print.Break.Time
          : Print.Break.None,
      );

    if (ampm === false)
      return icon + digits;

    const a = single
      ? this.print(Print.Time.AMPM).at(0)!
      : this.print(Print.Time.AMPM);

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

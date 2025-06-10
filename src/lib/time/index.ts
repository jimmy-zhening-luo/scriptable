export default class Time {
  private readonly date;

  constructor(
    date: (
      | Date
      | number
    ) = new Date(),
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

  public get timezone() {
    return this
      .date
      .getTimezoneOffset() / 60;
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
    return new Date(
      this.date,
    );
  }

  public at(
    hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0,
  ) {
    try {
      return new Time(
        this
          .toDate()
          .setHours(
            hours,
            minutes,
            seconds,
            milliseconds,
          ),
      );
    }
    catch (e) {
      throw new RangeError(
        "Failed to get date at time: " + [
          hours,
          minutes,
          seconds,
          milliseconds,
        ]
          .map(number => String(number))
          .join(":"),
        { cause: e },
      );
    }
  }
}

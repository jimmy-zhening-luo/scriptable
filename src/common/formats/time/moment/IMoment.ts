abstract class IMoment {
  constructor(
    public readonly moment = new Date(),
    protected readonly join = " ",
  ) {}

  public get epoch(): posint {
    try {
      return this
        .moment
        .getTime() as posint;
    }
    catch (e) {
      throw new EvalError(
        `IMoment: epoch`,
        { cause: e },
      );
    }
  }

  public get datetime() {
    try {
      const datetime = [
        this
          .date,
        this
          .time,
      ] as const;

      return datetime
        .join(
          this
            .join,
        ) as Join<typeof datetime>;
    }
    catch (e) {
      throw new EvalError(
        `IMoment: datetime`,
        { cause: e },
      );
    }
  }

  public get date() {
    try {
      const date = this
        .moment
        .toLocaleDateString(
          "en-US",
          this
            .dateOptions,
        );

      if (
        date
          .length > 0
      )
        return date as stringful;
      else
        throw new RangeError(
          `date is empty`,
          { cause: { dateOptions: this.dateOptions } },
        );
    }
    catch (e) {
      throw new EvalError(
        `IMoment: date`,
        { cause: e },
      );
    }
  }

  public get time() {
    try {
      const localoffset = [
        this
          .local,
        this
          .offset,
      ] as const;

      return localoffset
        .join("") as Join<
        typeof localoffset,
        ""
      >;
    }
    catch (e) {
      throw new EvalError(
        `IMoment: time`,
        { cause: e },
      );
    }
  }

  public get local() {
    try {
      const local = this
        .moment
        .toLocaleTimeString(
          "en-US",
          this
            .localTimeOptions,
        );

      if (
        local
          .length > 0
      )
        return local as stringful;
      else
        throw new RangeError(
          `local time is empty`,
          { cause: { localTimeOptions: this.localTimeOptions } },
        );
    }
    catch (e) {
      throw new EvalError(
        `IMoment: local`,
        { cause: e },
      );
    }
  }

  public get offset() {
    try {
      return (
        this
          .moment
          .getTimezoneOffset() / -60
      )
        .toLocaleString(
          "en-US",
          {
            signDisplay: "always",
            minimumIntegerDigits: 2,
            maximumFractionDigits: 1,
          },
        );
    }
    catch (e) {
      throw new EvalError(
        `IMoment: offset`,
        { cause: e },
      );
    }
  }

  protected abstract get dateOptions(): Table;

  protected abstract get localTimeOptions(): Table;

  public toString() {
    try {
      return this
        .datetime;
    }
    catch (e) {
      throw new EvalError(
        `IMoment: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = IMoment;

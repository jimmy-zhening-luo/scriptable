abstract class IMoment {
  constructor(
    public readonly moment = new Date(),
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
      const {
        separator,
        date,
        time,
      } = this;
      const datetime = [
        date,
        time,
      ] as const;

      return datetime
        .join(
          this
            .separator,
        ) as Join<
        typeof datetime,
        typeof separator
      >;
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
      const {
        formatDate,
        moment,
      } = this;
      const date = moment
        .toLocaleDateString(
          "en-US",
          formatDate,
        );

      if (
        date
          .length > 0
      )
        return date as stringful;
      else
        throw new RangeError(
          `date is empty`,
          { cause: { formatDate: this.formatDate } },
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
      const separator = "";
      const {
        local,
        offset,
      } = this;
      const localOffset = [
        local,
        offset,
      ] as const;

      return localOffset
        .join(
          separator,
        ) as Join<
        typeof localOffset,
        typeof separator,
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
      const {
        formatLocal,
        moment,
      } = this;
      const local = moment
        .toLocaleTimeString(
          "en-US",
          formatLocal,
        );

      if (
        local
          .length > 0
      )
        return local as stringful;
      else
        throw new RangeError(
          `local time is empty`,
          { cause: { formatLocal: this.formatLocal } },
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

  protected abstract get separator(): string;
  protected abstract get formatDate(): Table;
  protected abstract get formatLocal(): Table;

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

  protected abstract afterDate(date: string): string;
  protected abstract afterLocal(local: string): string;
}

module.exports = IMoment;

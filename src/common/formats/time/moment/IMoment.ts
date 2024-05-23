abstract class IMoment {
  constructor(
    public readonly moment = new Date(),
    protected readonly join = " ",
  ) {}

  public get epoch() {
    try {
      return this
        .moment
        .getTime();
    }
    catch (e) {
      throw new EvalError(
        `IMoment: epoch`,
        { cause: e },
      );
    }
  }

  public get full() {
    try {
      return [
        this
          .date,
        this
          .time,
      ]
        .join(
          this
            .join,
        ) as stringful;
    }
    catch (e) {
      throw new EvalError(
        `IMoment: full`,
        { cause: e },
      );
    }
  }

  public get date() {
    try {
      return this
        .moment
        .toLocaleDateString(
          "en-US",
          this
            .dateOptions,
        ) as stringful;
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
      return [
        this
          .local,
        this
          .offset,
      ]
        .join("") as stringful;
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
      return this
        .moment
        .toLocaleTimeString(
          "en-US",
          this
            .localTimeOptions,
        ) as stringful;
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
        ) as stringful;
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
        .full;
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

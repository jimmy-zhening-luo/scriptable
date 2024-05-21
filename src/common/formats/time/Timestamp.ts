class Timestamp {
  constructor(
    public readonly moment = new Date(),
  ) {}

  public get epoch() {
    try {
      return this
        .moment
        .getTime();
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: epoch`,
        { cause: e },
      );
    }
  }

  public get full() {
    try {
      return `${
        this
          .date
      } ${
        this
          .time
      }` as stringful;
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: full`,
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
          {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
          },
        ) as stringful;
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: date`,
        { cause: e },
      );
    }
  }

  public get time() {
    try {
      return `${
        this
          .local
      }${
        this
          .offset
      }` as stringful;
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: time`,
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
          {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          },
        ) as stringful;
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: local`,
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
        `Timestamp: offset`,
        { cause: e },
      );
    }
  }

  public toString() {
    try {
      return this
        .full;
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: toString`,
        { cause: e },
      );
    }
  }
}

module.exports = Timestamp;

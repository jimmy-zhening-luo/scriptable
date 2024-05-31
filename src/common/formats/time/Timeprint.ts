const p_IMoment = importModule(
  `moment/IMoment`,
) as typeof IMoment;

class Timeprint extends p_IMoment {
  public override get offset() {
    try {
      return "";
    }
    catch (e) {
      throw new EvalError(
        `Timeprint: offset`,
        { cause: e },
      );
    }
  }

  protected get dateOptions() {
    try {
      return {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
    }
    catch (e) {
      throw new EvalError(
        `Timeprint: dateOptions`,
        { cause: e },
      );
    }
  }

  protected get localTimeOptions() {
    try {
      return { timeStyle: "short" };
    }
    catch (e) {
      throw new EvalError(
        `Timeprint: localTimeOptions`,
        { cause: e },
      );
    }
  }
}

module.exports = Timeprint;

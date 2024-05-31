const s_IMoment = importModule(
  `moment/IMoment`,
) as typeof IMoment;

class Timestamp extends s_IMoment {
  protected get dateOptions() {
    try {
      return {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      };
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: dateOptions`,
        { cause: e },
      );
    }
  }

  protected get localTimeOptions() {
    try {
      return {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: localTimeOptions`,
        { cause: e },
      );
    }
  }
}

module.exports = Timestamp;

const s_IMoment = importModule(
  `moment/IMoment`,
) as typeof IMoment;

class Timestamp extends s_IMoment {
  protected get separator() {
    try {
      return "";
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: separator`,
        { cause: e },
      );
    }
  }

  protected get formatDate() {
    try {
      return {
        month: "2-digit",
        day: "2-digit",
        year: "numeric",
      };
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: formatDate`,
        { cause: e },
      );
    }
  }

  protected get formatLocal() {
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
        `Timestamp: formatLocal`,
        { cause: e },
      );
    }
  }

  protected afterDate(
    date: string,
  ) {
    try {
      return date
        .split(
          "/",
        )
        .join(
          "",
        );
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: afterDate`,
        { cause: e },
      );
    }
  }

  protected afterLocal(
    local: string,
  ) {
    try {
      return local
        .split(
          ":",
        )
        .join(
          "",
        );
    }
    catch (e) {
      throw new EvalError(
        `Timestamp: afterLocal`,
        { cause: e },
      );
    }
  }
}

module.exports = Timestamp;

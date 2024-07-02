import type IMoment from "./moment/IMoment.js";

const iMoment = importModule(
  `moment/IMoment`,
) as typeof IMoment;

export default class Timeprint extends iMoment {
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

  protected get separator() {
    try {
      return " " as stringful;
    }
    catch (e) {
      throw new EvalError(
        `Timeprint: separator`,
        { cause: e },
      );
    }
  }

  protected get formatDate() {
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
        `Timeprint: formatDate`,
        { cause: e },
      );
    }
  }

  protected get formatLocal() {
    try {
      return { timeStyle: "short" };
    }
    catch (e) {
      throw new EvalError(
        `Timeprint: formatLocal`,
        { cause: e },
      );
    }
  }

  protected afterDate(
    date: string,
  ) {
    try {
      return date;
    }
    catch (e) {
      throw new EvalError(
        `Timeprint: afterDate`,
        { cause: e },
      );
    }
  }

  protected afterLocal(
    local: string,
  ) {
    try {
      return local;
    }
    catch (e) {
      throw new EvalError(
        `Timeprint: afterLocal`,
        { cause: e },
      );
    }
  }
}
module.exports = Timeprint;

const p_IMoment = importModule(
  `moment/IMoment`,
) as typeof IMoment;

class Timeprint extends p_IMoment {
  protected separator = " " as stringful;
  protected formatDate = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  protected formatLocal = { timeStyle: "short" };

  public override get offset() {
    return String();
  }

  protected afterDate(date: string) {
    return date;
  }

  protected afterLocal(local: string) {
    return local;
  }
}

module.exports = Timeprint;

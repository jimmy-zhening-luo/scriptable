const pMoment = importModule<typeof Moment>(
  `moment/Moment`,
);

class Timeprint extends pMoment {
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

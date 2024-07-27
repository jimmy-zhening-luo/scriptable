const pMoment = importModule<typeof Moment>(
  `moment/moment`,
);

class timeprint extends pMoment {
  protected separator = " ";
  protected dateFormat = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  protected timeFormat = { timeStyle: "short" };

  public override get offset() {
    return String();
  }

  protected postdate(date: string) {
    return date;
  }

  protected postlocal(localtime: string) {
    return localtime;
  }
}

module.exports = timeprint;

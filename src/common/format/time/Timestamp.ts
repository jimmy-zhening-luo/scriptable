const sMoment = importModule<typeof Moment>(
  `moment/Moment`,
);

class Timestamp extends sMoment {
  protected separator = "";
  protected dateFormat = {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  };
  protected timeFormat = {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };

  protected postdate(date: string) {
    return date
      .split("/")
      .join("");
  }

  protected postlocal(localtime: string) {
    return localtime
      .split(":")
      .join("");
  }
}

module.exports = Timestamp;

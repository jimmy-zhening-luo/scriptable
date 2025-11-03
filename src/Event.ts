"pink calendar-alt";
import DateWidget from "./app/widget/date";

const ICON = {
  none: "\uF8FF",
  tomorrow: "\u203A",
  future: "\u2192",
};

const enum Limit {
  Unlimited,
  Compact = 28,
  Short = 30,
  Shorter = 31,
  Shortest = 33,
  Truncate = 35,
}

await new class Event extends DateWidget {
  protected async runtime() {
    function print(
      icon: Field<
        "full",
        "short"
      >,
      event: CalendarEvent,
    ) {
      const { title } = event,
      start = new Event.Time(event.startDate),
      length: Limit = icon.full.length
        + start.time().length
        + title.length,
      width = length < Limit.Compact
        ? Limit.Unlimited
        : length < Limit.Short
          ? Limit.Compact
          : length < Limit.Shorter
            ? Limit.Short
            : length < Limit.Shortest
              ? Limit.Shorter
              : length < Limit.Truncate
                ? Limit.Shortest
                : Limit.Truncate,
      format = {
        start: start
          .time(
            {
              zero: true,
              block: true,
              colon: width < Limit.Short,
              single: width > Limit.Compact,
              ampm: width !== Limit.Unlimited
                ? width !== Limit.Compact
                  ? width !== Limit.Short
                    ? width !== Limit.Shorter
                      ? ""
                      : "\u200A"
                    : "\u2009"
                  : "\u2006"
                : "\u2005",
              icon: width !== Limit.Unlimited
                ? "short" in icon
                  ? icon.short
                  : ""
                : icon.full,
            },
          ),
        separator: width !== Limit.Unlimited
          ? width !== Limit.Compact
            ? width !== Limit.Short
              ? width !== Limit.Shorter
                ? width !== Limit.Shortest
                  ? ""
                  : "\u200A"
                : "\u2009"
              : "\u2006"
            : "\u2005"
          : "\u2009 ",
        title: width !== Limit.Unlimited
          ? title
              .replaceAll(/[\-_.,'"]/ug, "")
              .replaceAll(
                " ",
                width !== Limit.Compact
                  ? width !== Limit.Short
                    ? width !== Limit.Shorter
                      ? width !== Limit.Shortest
                        ? ""
                        : "\u200A"
                      : "\u2009"
                    : "\u2006"
                  : "\u2005",
              )
          : title,
      };

      return format.start
        + format.separator
        + format.title;
    }

    const calendar = await Calendar.defaultForEvents(),
    now = new Event.Time,
    eventsLaterToday = await CalendarEvent.between(
      now
        .ago(0.5)
        .date(),
      now
        .eod
        .date(),
      [calendar],
    ),
    { tomorrow } = now,
    eventsTomorrow = await CalendarEvent.between(
      tomorrow.date(),
      (
        now < now.at(22)
          ? now.in(26)
          : tomorrow.eod
      )
        .date(),
      [calendar],
    ),
    future = now.in(24 * 31),
    [laterToday] = eventsLaterToday.filter(
      event => !event.isAllDay,
    ),
    [firstTomorrow] = eventsTomorrow.filter(
      event => !event.isAllDay,
    ),
    [soonest] = laterToday === undefined
      && firstTomorrow === undefined
      ? await CalendarEvent.between(
        tomorrow.date(),
        now
          .in(24 * 31)
          .date(),
        [calendar],
      )
      : [undefined],
    future = soonest === undefined
      ? undefined
      : new Event.Time(soonest.startDate);

    this.url = "https://calendar.google.com/calendar/u/0/r/3day/"
      + (
        laterToday === undefined
          ? firstTomorrow === undefined
            ? future === undefined
              ? now
              : future
            : tomorrow
          : now
      )
        .print("yyyy/MM/dd");
    void this.text(
      laterToday === undefined
        ? firstTomorrow === undefined
          ? future === undefined
            ? ICON.none
            : ICON.future + " " + future
              .print("MMM d")
          : print(
              {
                full: `\u2005${ICON.tomorrow}\u200A`,
                "short": ICON.tomorrow,
              },
              firstTomorrow,
            )
        : print(
            {
              full: "\u200A",
            },
            laterToday,
          ),
    );
  }
}().run();

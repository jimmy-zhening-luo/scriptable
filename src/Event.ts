// icon-color: pink; icon-glyph: calendar-alt;
import DateWidget from "./app/widget/date";

const ICON = {
  none: "\uF8FF",
  tomorrow: "\u203A",
};

const enum Limit {
  Unlimited,
  Limited = 27,
  Short = 29,
  Shorter = 30,
  Shortest = 32,
  Truncate = 34,
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
      start = new Event
        .Time(event.startDate)
        .print("h:mm a"),
      length: Limit = icon.full.length
        + start.length
        + title.length,
      limit = length > Limit.Truncate
        ? Limit.Truncate
        : length > Limit.Shortest
          ? Limit.Shortest
          : length > Limit.Shorter
            ? Limit.Shorter
            : length > Limit.Short
              ? Limit.Short
              : length > Limit.Limited
                ? Limit.Limited
                : Limit.Unlimited,
      print = {
        icon: limit !== Limit.Unlimited
          ? "short" in icon
            ? icon.short
            : ""
          : icon.full,
        start: start
          .replace("A", "\u1D00")
          .replace("P", "\u1D18")
          .replace(
            "M",
            limit > Limit.Limited
              ? ""
              : "\u1D0D",
          )
          .replace(
            ":00",
            limit !== Limit.Unlimited
              ? ""
              : ":00",
          )
          .replace(
            ":",
            limit > Limit.Limited
              ? ""
              : ":",
          )
          .replace(
            " ",
            limit !== Limit.Unlimited
              ? ""
              : "\u200A",
          ),
        title: limit !== Limit.Unlimited
          ? title
              .replaceAll(/[\-_.,'"]/ug, "")
              .replaceAll(
                " ",
                limit !== Limit.Limited
                  ? limit !== Limit.Short
                    ? limit !== Limit.Shorter
                      ? limit !== Limit.Shortest
                        ? ""
                        : "\u200A"
                      : "\u2009"
                    : "\u2006"
                  : "\u2005",
              )
          : title,
        separator: limit !== Limit.Unlimited
          ? limit !== Limit.Limited
            ? limit !== Limit.Short
              ? limit !== Limit.Shorter
                ? limit !== Limit.Shortest
                  ? ""
                  : "\u200A"
                : "\u2009"
              : "\u2006"
            : "\u2005"
          : "\u2009 ",
      };

      return print.icon.concat(
        print.start,
        print.separator,
        print.title,
      );
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
    [laterToday] = eventsLaterToday.filter(
      event => !event.isAllDay,
    ),
    [firstTomorrow] = eventsTomorrow.filter(
      event => !event.isAllDay,
    );

    this.url = "https://calendar.google.com/calendar/u/0/r/3day/"
      .concat(
        (
          laterToday === undefined
          && firstTomorrow !== undefined
            ? tomorrow
            : now
        )
          .print("yyyy/MM/dd"),
      );
    void this.text(
      laterToday === undefined
        ? firstTomorrow === undefined
          ? ICON.none
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

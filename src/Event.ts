// icon-color: pink; icon-glyph: calendar-alt;
import DateWidget from "./app/widget/date";

const ICON = {
  none: "\uD834\uDD2A",
  tomorrow: "\u00BB",
};

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
      length = icon.full.length
        + start.length
        + title.length,
      LENGTH_LIMIT = [
        34,
        32,
        30,
        29,
        27,
      ] as const,
      printLength = length > LENGTH_LIMIT[0]
        ? 0
        : length > LENGTH_LIMIT[1]
          ? 1
          : length > LENGTH_LIMIT[2]
            ? 2
            : length > LENGTH_LIMIT[3]
              ? 3
              : length > LENGTH_LIMIT[4]
                ? 4
                : 5,
      print = {
        icon: printLength !== 5
          ? "short" in icon
            ? icon.short
            : ""
          : icon.full,
        start: start
          .replace("A", "\u1D00")
          .replace("P", "\u1D18")
          .replace(
            "M",
            printLength !== 5
            && printLength !== 4
              ? ""
              : "\u1D0D",
          )
          .replace(
            ":00",
            printLength !== 5
              ? ""
              : ":00",
          )
          .replace(
            ":",
            printLength !== 5
            && printLength !== 4
              ? ""
              : ":",
          )
          .replace(
            " ",
            printLength !== 5
              ? ""
              : "\u200A",
          ),
        title: printLength !== 5
          ? title
              .replaceAll("-", "")
              .replaceAll(
                " ",
                printLength !== 4
                  ? printLength !== 3
                    ? printLength !== 2
                      ? printLength !== 1
                        ? ""
                        : "\u200A"
                      : "\u2009"
                    : "\u2006"
                  : "\u2005",
              )
          : title,
        separator: printLength !== 5
          ? printLength !== 4
            ? printLength !== 3
              ? printLength !== 2
                ? printLength !== 1
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
        .toDate(),
      now
        .eod
        .toDate(),
      [calendar],
    ),
    tomorrow = now
      .in(24)
      .midnight,
    eventsTomorrow = await CalendarEvent.between(
      tomorrow.toDate(),
      (
        now < now.at(22)
          ? now.in(26)
          : tomorrow.eod
      )
        .toDate(),
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

// icon-color: pink; icon-glyph: calendar-alt;
import DateWidget from "./core/widget/date";

class Event extends DateWidget {
  protected async runtime() {
    function print(
      icon: Field<
        "full",
        "short"
      >,
      event: CalendarEvent,
    ) {
      const { title } = event,
      start = new DateWidget
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
    now = new DateWidget.Time,
    tomorrow = now.in(24).midnight,
    eventsRemaining = await CalendarEvent.between(
      now.ago(0.5).toDate(),
      now.eod.toDate(),
      [calendar],
    ),
    eventsTomorrow = await CalendarEvent.between(
      tomorrow.toDate(),
      tomorrow.eod.toDate(),
      [calendar],
    ),
    [nextToday] = eventsRemaining.filter(
      event => !event.isAllDay,
    ),
    [firstTomorrow] = eventsTomorrow.filter(
      event => !event.isAllDay,
    );

    void this.text(
      nextToday === undefined
        ? firstTomorrow === undefined
          ? "\u2713"
          : print(
              {
                full: "\u2005\u25D1 ",
                "short": "\u25D1",
              },
              firstTomorrow,
            )
        : print(
            {
              full: "\u200A",
            },
            nextToday,
          ),
    );
  }
}

await new Event(
  "https://calendar.google.com/calendar/u/0/r/3day/"
    .concat(
      new DateWidget
        .Time()
        .print("yyyy/MM/dd"),
    ),
).run();

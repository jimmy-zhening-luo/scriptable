// icon-color: pink; icon-glyph: calendar-alt;
import Widget from "./core/widget";

class EventBar extends Widget {
  protected async runtime() {
    function print(
      icon: Field<
        "full",
        "short"
      >,
      event: CalendarEvent,
    ) {
      const { title } = event,
      start = new Widget
        .Time(event.startDate)
        .print("h:mm a"),
      length = icon.full.length
        + start.length
        + title.length,
      LENGTH_LIMIT = [
        36,
        34,
        32,
        30,
      ] as const,
      printLength = length > LENGTH_LIMIT[0]
        ? 0
        : length > LENGTH_LIMIT[1]
          ? 1
          : length > LENGTH_LIMIT[2]
            ? 2
            : length > LENGTH_LIMIT[3]
              ? 3
              : 4,
      print = {
        icon: printLength < 4
          ? "short" in icon
            ? icon.short
            : ""
          : icon.full,
        start: start
          .replace("A", "\u1D00")
          .replace("P", "\u1D18")
          .replace(
            "M",
            printLength < 3
              ? ""
              : "\u1D0D",
          )
          .replace(
            " ",
            printLength < 4
              ? ""
              : "\u200A",
          ),
        title: printLength < 4
          ? title
              .replaceAll("-", "")
              .replaceAll(
                " ",
                printLength < 3
                  ? printLength < 2
                    ? printLength < 1
                      ? "\u200A"
                      : "\u2009"
                    : "\u2006"
                  : "\u2005",
              )
          : title,
        separator: printLength < 4
          ? printLength < 3
            ? printLength < 2
              ? printLength < 1
                ? "\u200A"
                : "\u2009"
              : "\u2006"
            : " "
          : "\u2009 ",
      };

      return print.icon
        + [
          print.start,
          print.title,
        ]
          .join(print.separator);
    }

    const calendar = await Calendar.defaultForEvents(),
    now = new Widget.Time,
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
                "short": "\u25D1\u200A",
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

await new EventBar(
  null,
  "calendar",
  {
    url: "https://calendar.google.com/calendar/u/0/r/3day/" + new Widget.Time().print("yyyy/MM/dd"),
  },
).run();

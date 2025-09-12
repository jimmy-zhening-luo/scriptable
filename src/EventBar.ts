// icon-color: pink; icon-glyph: calendar-alt;
import Widget from "./core/widget";

class EventBar extends Widget {
  protected async runtime() {
    function print(
      icon: string,
      event: CalendarEvent,
    ) {
      const {
        title,
        startDate,
      } = event,
      printStart = new Widget
        .Time(startDate)
        .print("h:mm a")
        .replace(" ", "\u200A")
        .replace("M", "\u1D0D")
        .replace("P", "\u1D18")
        .replace("A", "\u1D00"),
      printTitle = (icon.length + printStart.length + title.length) > 30
        ? title.replaceAll(" ", "")
        : title;

      return icon
      + [
        printStart,
        printTitle,
      ]
        .join("\u2009 ");
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
              "\u2005\u25D1 ",
              firstTomorrow,
            )
        : print(
            "\u200A",
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

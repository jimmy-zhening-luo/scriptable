// icon-color: pink; icon-glyph: calendar-alt;
import Widget from "./core/widget";

class EventBar extends Widget {
  protected async runtime() {
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
    ),
    upcoming = nextToday ?? firstTomorrow ?? null;

    void this.text(
      upcoming === null
        ? "\u2713"
        : [
            nextToday === undefined
              ? "\u2005\u25D1 "
              : "\u200A",
            [
              new Widget
                .Time(upcoming.startDate)
                .print("h:mm a")
                .replace(" ", "\u200A")
                .replace("M", "\u1D0D")
                .replace("P", "\u1D18")
                .replace("A", "\u1D00"),
              upcoming.title,
            ]
              .join("\u2009 "),
          ]
            .join(""),
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

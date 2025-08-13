// icon-color: pink; icon-glyph: calendar-alt;
import Widget from "./core/widget";

class EventBar extends Widget {
  protected async runtime() {
    const calendar = await Calendar.defaultForEvents(),
    now = new Widget.Time,
    events = await CalendarEvent.between(
      new now.ago(0.5).toDate(),
      new now.in(24.5).toDate(),
      [calendar],
    ),
    [upcoming] = events.filter(
      event => !event.isAllDay,
    );

    void this.text(
      upcoming === undefined
        ? "\u2713"
        : [
            new Widget
              .Time(upcoming.startDate)
              .print("h:mm a")
              .replace(" ", "\u200A")
              .replace("M", "\u1D0D")
              .replace("P", "\u1D18")
              .replace("A", "\u1D00"),
            upcoming.title,
          ]
            .join(" \u2006"),
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

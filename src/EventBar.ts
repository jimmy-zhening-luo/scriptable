// icon-color: pink; icon-glyph: calendar-alt;
import Widget from "./core/widget";

class EventBar extends Widget {
  protected async runtime() {
    this.url = "https://calendar.google.com/calendar/u/0/r/3day/" + new Widget.Time().print("yyyy/MM/dd");

    const calendar = await Calendar.defaultForEvents(),
    events = await CalendarEvent.between(
      new Widget
        .Time()
        .ago(0.5)
        .toDate(),
      new Widget
        .Time()
        .in(24.5)
        .toDate(),
      [calendar],
    ),
    [nextEvent = null] = events.filter(
      event => !event.isAllDay,
    );

    if (nextEvent === null)
      this.text("No events");
    else
      this.text(
        [
          new Widget
            .Time(nextEvent.startDate)
            .print("h:mma"),
          nextEvent.title,
        ]
          .join("  "),
      );
  }
}

await new EventBar(null, "calendar").run();

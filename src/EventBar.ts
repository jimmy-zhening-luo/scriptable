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
      shorten = (icon.full.length
      + start.length
      + title.length) > 30,
      print = {
        icon: shorten
          ? "short" in icon
            ? icon.short
            : ""
          : icon.long,
        start: start
          .replace("M", "\u1D0D")
          .replace("P", "\u1D18")
          .replace("A", "\u1D00")
          .replace(
            " ",
            shorten
              ? ""
              : "\u200A",
          ),
        title: shorten
          ? title.replaceAll(" ", "")
          : title,
        separator: shorten
          ? "\u200A"
          : "\u2009 ",
      },

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
                short: "\u200A",
              },
              firstTomorrow,
            )
        : print(
            {
              full: "\u200A",
            }
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

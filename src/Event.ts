"pink calendar-alt";
import DateWidget from "./app/widget/date";
import print from "./private/Event";

type Time = Instance<typeof DateWidget.Time>;

await new class Event extends DateWidget {
  protected async runtime() {
    const calendar = [
      await Calendar.defaultForEvents(),
    ],
    find = async (from: Time, to: Time) => (
      await CalendarEvent.between(
        from.date(),
        to.date(),
        calendar,
      )
    )
      .filter(({ isAllDay }) => !isAllDay)[0];

    const enum Window {
      Skew = 0.5,
      Hour = Skew * 2,
      Day = Hour * 24,
      DayMinus = Day - Skew,
      DayPlus = Day + Skew,
      Future = Day * 8,
    }
    const now = new Event.Time,
    { tomorrow } = now,
    event = await find(
      now.ago(Window.Skew),
      now.eod,
    )
      ?? await find(
          tomorrow,
          now < now.at(Window.DayMinus)
            ? now.in(Window.DayPlus)
            : tomorrow.eod,
        )
      ?? await find(
          tomorrow,
          now.in(Window.Future),
        ),
    start = event && new Event.Time(event.startDate) ?? now;

    this.url = "https://calendar.google.com/calendar/u/0/r/3day/"
      + start.print("y/MM/dd");

    const enum Badge {
      None = "\uF8FF",
      Tomorrow = "\u203A",
      Future = "\u2197",
    }
    const enum Format {
      Future = "M\uFF65d",
    }
    void this.text(
      event
        ? print(
            event,
            start,
            start.today
              ? {}
              : start < now.tomorrow.tomorrow
                ? { badge: Badge.Tomorrow }
                : {
                    badge: Badge.Future,
                    format: Format.Future,
                  },
          )
        : Badge.None,
    );
  }
}().run();

"pink calendar-alt";
import DateWidget from "./app/widget/date";
import Calendar from "./lib/calendar";
import print from "./private/Event";
import type { EventSetting } from "./private/Event/setting";

type Time = Instance<typeof DateWidget.Time>;

await new class Event extends DateWidget<EventSetting> {
  protected async runtime() {
    const calendar = new Calendar(this.setting.additional);

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
    event = await calendar.next(
      now.ago(Window.Skew),
      now.eod,
    )
    ?? await calendar.next(
      tomorrow,
      now < now.at(Window.DayMinus)
        ? now.in(Window.DayPlus)
        : tomorrow.eod,
    )
    ?? await calendar.next(
      tomorrow,
      now.in(Window.Future),
    ),
    start = event
      ? new Event.Time(event.startDate)
      : now;

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

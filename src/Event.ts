"pink calendar-alt";
import DateWidget from "./app/widget/date";

const enum Space {
  None = "",
  Hair = "\u200A",
  Thin = "\u2009",
  Sixth = "\u2006",
  Fourth = "\u2005",
  Full = " ",
  FullHair = Full + Hair,
  FullThin = Full + Thin,
  FullSixth = Full + Sixth,
  FullFourth = Full + Fourth,
  Double = Full + Full,
}

type Time = InstanceType<typeof DateWidget.Time>;

await new class Event extends DateWidget {
  protected async runtime() {
    const now = new Event.Time,
    { tomorrow } = now,
    calendar = await Calendar.defaultForEvents(),
    events = async (range: Tuple<Time>) => (
      await CalendarEvent.between(
        range[0].date(),
        range[1].date(),
        [calendar],
      )
    )
      .filter(event => !event.isAllDay),
    [laterToday] = await events(
      [
        now.ago(0.5),
        now.eod,
      ],
    ),
    [firstTomorrow] = laterToday
      ? [undefined]
      : await events(
          [
            tomorrow,
            now < now.at(22)
              ? now.in(26)
              : tomorrow.eod,
          ],
        ),
    [soonest] = laterToday || firstTomorrow
      ? [undefined]
      : await events(
          [
            tomorrow,
            now.in(744),
          ],
        ),
    future = soonest && new Event.Time(soonest.startDate);

    this.url = "https://calendar.google.com/calendar/u/0/r/3day/"
      + (
        laterToday
          ? now
          : firstTomorrow
            ? tomorrow
            : future ?? now
      )
        .print("y/MM/dd");

    function print(
      icon: Field<
        "full",
        "short"
      >,
      event: CalendarEvent,
    ) {
      const { title } = event,
      start = new Event.Time(event.startDate),
      length = icon.full.length
        + start.time().length
        + title.length;

      const enum Width {
        Unlimited,
        Compact,
        Short,
        Shorter,
        Shortest,
        Truncate,
      }

      const enum Limit {
        Unlimited,
        Compact = 28,
        Short = Compact + 2,
        Shorter,
        Shortest = Shorter + 2,
        Truncate = Shortest + 2,
      }

      const width = [
        Limit.Unlimited,
        Limit.Compact,
        Limit.Short,
        Limit.Shorter,
        Limit.Shortest,
        Limit.Truncate,
        Infinity,
      ]
        .findIndex(lim => lim > length)
        - 1 as Width,
      space = [
        Space.FullThin,
        Space.Fourth,
        Space.Sixth,
        Space.Thin,
        Space.Hair,
        Space.None,
      ],
      format = {
        start: start.time(
          {
            zero: true,
            block: true,
            colon: width < Width.Short,
            single: width > Width.Compact,
            ampm: space[width + 1] ?? Space.None,
            icon: width === Width.Unlimited
              ? icon.full
              : icon.short ?? Space.None,
          },
        ),
        separator: space[width]!,
        title: width === Width.Unlimited
          ? title
          : title
              .replaceAll(
                /[^a-z\d\s]+/ugi,
                space[width + 1] ?? Space.None,
              )
              .replaceAll(
                /[ \t]+/ug,
                space[width]!,
              ),
      };

      return format.start
        + format.separator
        + format.title;
    }

    const enum Icon {
      None = "\uF8FF",
      Tomorrow = "\u203A",
      Future = "\u2197",
    }

    void this.text(
      laterToday
        ? print(
            {
              full: Space.Hair,
            },
            laterToday,
          )
        : firstTomorrow
          ? print(
              {
                full: Space.Fourth
                  + Icon.Tomorrow
                  + Space.Hair,
                "short": Icon.Tomorrow,
              },
              firstTomorrow,
            )
          : future
            ? Space.FullHair
            + Icon.Future
            + Space.FullThin
            + future.print("M\uFF65d")
            : Icon.None,
    );
  }
}().run();

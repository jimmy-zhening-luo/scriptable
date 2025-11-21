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

await new class Event extends DateWidget {
  protected async runtime() {
    const calendar = await Calendar.defaultForEvents(),
    now = new Event.Time,
    { tomorrow } = now;

    async function events(
      calendar: Calendar,
      range: Tuple<InstanceType<typeof DateWidget.Time>>,
    ) {
      return (
        await CalendarEvent.between(
          range[0].date(),
          range[1].date(),
          [calendar],
        )
      )
        .filter(event => !event.isAllDay);
    }

    const [laterToday] = await events(
      calendar,
      [
        now.ago(0.5),
        now.eod,
      ],
    ),
    [firstTomorrow] = laterToday
      ? [undefined]
      : await events(
          calendar,
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
          calendar,
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
      const enum Limit {
        Unlimited,
        Compact = 28,
        Short = Compact + 2,
        Shorter,
        Shortest = Shorter + 2,
        Truncate = Shortest + 2,
      }

      const { title } = event,
      start = new Event.Time(event.startDate),
      length: Limit = icon.full.length
        + start.time().length
        + title.length,
      width = length < Limit.Compact
        ? Limit.Unlimited
        : length < Limit.Short
          ? Limit.Compact
          : length < Limit.Shorter
            ? Limit.Short
            : length < Limit.Shortest
              ? Limit.Shorter
              : length < Limit.Truncate
                ? Limit.Shortest
                : Limit.Truncate,
      format = {
        start: start
          .time(
            {
              zero: true,
              block: true,
              colon: width < Limit.Short,
              single: width > Limit.Compact,
              ampm: width !== Limit.Unlimited
                ? width !== Limit.Compact
                  ? width !== Limit.Short
                    ? width !== Limit.Shorter
                      ? Space.None
                      : Space.Hair
                    : Space.Thin
                  : Space.Sixth
                : Space.Fourth,
              icon: width !== Limit.Unlimited
                ? "short" in icon
                  ? icon.short
                  : Space.None
                : icon.full,
            },
          ),
        separator: width !== Limit.Unlimited
          ? width !== Limit.Compact
            ? width !== Limit.Short
              ? width !== Limit.Shorter
                ? width !== Limit.Shortest
                  ? Space.None
                  : Space.Hair
                : Space.Thin
              : Space.Sixth
            : Space.Fourth
          : Space.FullThin,
        title: width !== Limit.Unlimited
          ? title
              .replaceAll(
                /[^a-z\d\s]+/ugi,
                width !== Limit.Compact
                  ? width !== Limit.Short
                    ? width !== Limit.Shorter
                      ? Space.None
                      : Space.Hair
                    : Space.Thin
                  : Space.Sixth,
              )
              .replaceAll(
                /[ \t]+/ug,
                width !== Limit.Compact
                  ? width !== Limit.Short
                    ? width !== Limit.Shorter
                      ? width !== Limit.Shortest
                        ? Space.None
                        : Space.Hair
                      : Space.Thin
                    : Space.Sixth
                  : Space.Fourth,
              )
          : title,
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

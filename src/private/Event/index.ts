import type Time from "../../lib/time";

export default function (
  event: CalendarEvent,
  start: Time,
  display: Field<
    never,
    | "badge"
    | "format"
  >,
) {
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
  }

  if (badge.format)
    return Space.FullHair
      + display.badge!
      + Space.FullThin
      + start.print(badge.format);

  const { title } = event,
  length = display.badge.length
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
  headline = !width
    ? title
    : title
        .replaceAll(
          /[^a-z\d\s]+/ugi,
          space[width + 1] ?? Space.None,
        )
        .replaceAll(
          /[ \t]+/ug,
          space[width]!,
        );

  return start.time({
    zero: true,
    block: true,
    colon: width < Width.Short,
    single: width > Width.Compact,
    ampm: space[width + 1] ?? Space.None,
    badge: !width
      ? (
          display.badge
            ? Space.Fourth + display.badge
            : Space.None
        ) + Space.Hair
      : display.badge || Space.None,
  })
    + space[width]!
    + headline;
}

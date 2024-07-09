(() => {
  const events = args.shortcutParameter as Event[];
  const DURATION = [
    "‎   ‎ I",
    "‎  I I",
    "I I I",
  ];
  const WEEKDAY = {
    Su: "S     ",
    Mo: "M    ",
    Tu: "T     ",
    We: "W    ",
    Fr: "F     ",
    Th: "Th   ",
    Sa: "Sa   ",
  };
  const labels = Object.fromEntries(
    events.map(
      ({
        title,
        dur,
        d,
        w,
        h,
        c,
      }) =>
        [
          [
            DURATION[
              Math.ceil(
                dur / 3600,
              ) - 1
            ]
            ?? "≥4",
            WEEKDAY[w],
            d,
            h,
            ...title === "Therapy"
              ? []
              : `[${title}]`,
          ]
            .join(
              "    ",
            ),
          c,
        ],
    ),
  );

  return labels;
})();

type Event =
  & Field<
    | "title"
    | "d"
    | "h"
    | "c"
  >
  & Scalar<"dur">
  & { w: Weekday }
;
type Weekday =
  | "Su"
  | "Mo"
  | "Tu"
  | "We"
  | "Th"
  | "Fr"
  | "Sa"
;

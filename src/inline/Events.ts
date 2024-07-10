"use strict";

(() => {
  "use strict";

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
  const records = events.map(
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
          DURATION[Math.ceil(dur / 3600) - 1] ?? "≥4",
          WEEKDAY[w],
          d,
          h,
          ...title === "Therapy"
            ? []
            : `[${title}]`,
        ]
          .join("    "),
        c,
      ],
  );
  const labels = records.map(
    ([label]) =>
      label,
  );
  const dates = Object.fromEntries(records) as FieldTable;

  return {
    labels,
    dates,
  };
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

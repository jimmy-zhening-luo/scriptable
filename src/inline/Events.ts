"use strict";

(() => {
"use strict";

const events = args.shortcutParameter as Event[],
  DURATION = [
    "‎   ‎ I",
    "‎  I I",
    "I I I",
  ],
  WEEKDAY = {
    Su: "S     ",
    Mo: "M    ",
    Tu: "T     ",
    We: "W    ",
    Fr: "F     ",
    Th: "Th   ",
    Sa: "Sa   ",
  },
  records = events.map(
    ({
      title,
      dur,
      d,
      w,
      h,
      c,
    }) => [
      [
        DURATION[Math.ceil(dur / 3600) - 1] ?? "≥4",
        WEEKDAY[w],
        d,
        h,
        ...title === "Therapy" ? [] : `[${title}]`,
      ].join("    "),
      c,
    ],
  );

records.push(["╋    New", "NEW"]);

const labels = records.map(([label]) => label),
  dates = Object.fromEntries(records) as FieldTable;

return { labels, dates };
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

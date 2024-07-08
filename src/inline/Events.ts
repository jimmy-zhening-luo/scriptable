const events = args.shortcutParameter;
const SEPARATOR = "    ";
const LABEL = {
  duration: [
    "‎   ‎ I",
    "‎  I I",
    "I I I",
  ],
  weekday: {
    Su: 'S     ',
    Mo: 'M    ',
    Tu: 'T     ',
    We: 'W    ',
    Fr: 'F     ',
    Th: 'Th   ',
    Sa: 'Sa   ',
  },
};
const labels = Object
  .fromEntries(
    events
      .map(
        event => {
          const {
            title,
            dur,
            d,
            w,
            h,
            c,
          } = event;
          const label = [
            LABEL.duration[Math.ceil(dur / 3600) - 1]
            ?? "≥4",
            LABEL.weekday[w],
            d,
            h,
            ...title === 'Therapy'
              ? []
              : `[${title}]`,
          ]
            .join(
              SEPARATOR,
            );

          return [
            label,
            c,
          ];
    }),
  );

return labels;

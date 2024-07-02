export function MenuObj() {
  "use strict";

  const choices = args.shortcutParameter as readonly string[];
  const { length } = choices;
  const padSize = Math.max(
    1,
    6 - length,
  );
  const pad = "\n".repeat(padSize);
  const up = length > 6
    ? ""
    : pad;
  const down = pad;
  const inverted = choices.map(
    choice =>
      [
        `${up}${choice}${down}`,
        choice,
      ],
  );
  const buttons = Object.fromEntries(
    inverted.map(
      ([button], i) =>
        [
          String(i),
          button,
        ],
    ),
  );

  return {
    buttons,
    inverse: Object.fromEntries(
      inverted,
    ) as Record<
      string
      ,
      string
    >,
    runner: `__M${length}`,
  };
}

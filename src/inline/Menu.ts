export function Menu() {
  "use strict";

  const FOLD = 6 as const;
  const choices = args
    .shortcutParameter as readonly string[];
  const n = choices
    .length;
  const pad = "\n"
    .repeat(
      Math
        .max(
          1,
          6 - n,
        ),
    );
  const [
    up,
    down,
  ] = [
    n > FOLD
      ? ""
      : pad,
    pad,
  ];
  const inverted = choices
    .map(
      choice =>
        [
          [
            up,
            choice,
            down,
          ]
            .join(
              "",
            ),
          choice,
        ],
    );
  const buttons = inverted
    .map(
      (
        [button],
      ) =>
        button,
    );

  return {
    buttons,
    inverse: Object
      .fromEntries(
        inverted,
      ) as Record<
      string
      ,
      string
    >,
    runner: `__M${n}`,
  };
}

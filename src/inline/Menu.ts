export function Menu() {
  "use strict";

  const range = {
    max: 9,
    fold: 6,
  };
  const choices = args
    .shortcutParameter as Unflat<
    string
  >;
  const n = choices
    .length;

  if (
    typeof choices === "string"
    || n < 2
  )
    return { choice: choices };
  else if (
    n > range
      .max
  )
    return { buttons: choices };
  else {
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
      n > range
        .fold
        ? ""
        : pad,
      pad,
    ];
    const inverted = choices
      .map(
        choice =>
          [
            `${up}${choice}${down}`,
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
      invert: Object
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
}

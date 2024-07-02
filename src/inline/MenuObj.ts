export function MenuObj() {
  "use strict";

  const range = {
    max: 12,
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
    throw new RangeError(
      `too many choices`,
    );
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
    const indexed = inverted
      .map(
        ([button], i) =>
          [
            String(i),
            button,
          ],
      );

    return {
      buttons: Object
        .fromEntries(
          indexed,
        ) as Record<
        string
        ,
        string
      >,
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

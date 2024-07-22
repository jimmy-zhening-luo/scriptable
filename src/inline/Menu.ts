"use strict";

(() => {
"use strict";

const choices = args.shortcutParameter as readonly string[],
      { length } = choices,
      padSize = Math.max(
        1,
        6 - length,
      ),
      pad = "\n".repeat(padSize),
      up = length > 6 ? "" : pad,
      down = pad,
      inverted = choices.map(choice => [`${up}${choice}${down}`, choice]),
      buttons = inverted.map(([button]) => button);

return {
  buttons,
  inverse: Object.fromEntries(inverted) as FieldTable,
  runner: `__M${length}`,
};
})();

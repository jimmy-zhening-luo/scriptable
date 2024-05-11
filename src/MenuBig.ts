// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: th-list;
"use strict";

namespace MenuBig {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class MenuBig extends shortcut<
    MenuBigInput,
    MenuBigOutput,
    MenuBigSetting
  > {
    public runtime(): ReturnType<MenuBig["run"]> {
      const {
        max,
        bar,
        omit,
      }: MenuBigSetting["app"] = this.app;
      const choices: string[] = [this.input ?? ""]
        .flat();
      const n: number = choices.length;

      if (n > max)
        throw new RangeError(
          `number of choices exceeds largest-supported menu size`,
          {
            cause: {
              max,
              n,
              choices,
              rawInputfulN: this.inputful.length,
            },
          },
        );

      const pad = "\n"
        .repeat(
          Math.max(
            1,
            6 - n,
          ),
        );
      const [
        big,
        small,
      ]: [string, string,
      ] = [
        pad,
        n > bar
          ? ""
          : pad,
      ];
      const [
        top,
        bottom,
      ]: [string, string,
      ] = omit === "bottom"
        ? [
            big,
            small,
          ]
        : [
            small,
            big,
          ];
      const [
        buttons,
        invert,
      ]: [string[], Record<string, string>,
      ] = [
        [],
        {},
      ];

      for (const choice of choices) {
        const button: string = `${top}${choice}${bottom}`;

        buttons.push(button);
        invert[button] = choice;
      }

      return {
        buttons,
        invert,
        n,
      };
    }
  }
}

new MenuBig.MenuBig()
  .run();

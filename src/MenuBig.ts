// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-brown; icon-glyph: th-list;
"use strict";

namespace MenuBig {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class MenuBig extends shortcut<
    string | string[],
    MenuBigOutput,
    MenuBigSetting
  > {
    public runtime(): ReturnType<MenuBig["run"]> {
      const {
        max,
        bar,
        omit,
      }: MenuBigSetting["app"] = this.app;
      const options: string[] = [this.input]
        .flat();
      const n: number = options.length;

      if (n > max)
        throw new RangeError(
          `number of options exceeds largest-supported menu size`,
          {
            cause: {
              max,
              n,
              options,
              rawInputN: this.input.length,
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

      for (const option of options) {
        const button: string = `${top}${option}${bottom}`;

        buttons.push(button);
        invert[button] = option;
      }

      return {
        buttons,
        invert,
      };
    }
  }
}

new MenuBig.MenuBig()
  .run();

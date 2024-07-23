// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: pen-square;
"use strict";

namespace Things {
  const shortcut = importModule<typeof Shortcut>(`system/Shortcut`);

  export class Things extends shortcut<
    string,
    readonly ThingsItem[],
    ThingsSetting
  > {
    protected runtime() {
      const { lists, delims } = this.setting,
            {
              TAG,
              LINE,
              ITEM,
            } = delim,
            validator = [
              TAG,
              LINE,
              ITEM,
            ] as const;

      if (validator.some(d => d.length < 0))
        throw new TypeError(
          `Delim empty or too short`,
          { cause: delim },
        );
      else if (TAG === ITEM || TAG === LINE || ITEM === LINE)
        throw new SyntaxError(
          `Conflicting delim`,
          { cause: delim },
        );
      else {
        const items = this
          .inputStringful
          .split(ITEM)
          .reverse()
          .map(
            item => item
              .trim()
              .split(LINE)
              .map(line => line.trim())
              .filter(line => line.length > 0)
              .join(LINE),
          );

        return items.map(
          (item): ThingsItem => {
            const tokens = item.split("::"),
                  { length } = tokens,
                  tag = length > 1
                    ? (tokens[length - 1] ?? "")[0] ?? null
                    : null;

            if (tag !== null) {
              const last = tokens.pop();

              tokens.push(last.slice(1));
            }

            const untaggedItem = tokens.join(""),
                  [when, list] = tag === null
                    ? [null, null]
                    : tag.length < 1 || tag === LINE || !(tag in list) || (list[tag] ?? "").length < 1
                      ? ["today", null]
                      : [
                          null,
                          list[tag] as unknown as string,
                        ],
                  lines = untaggedItem.split(LINE);

            return {
              title: lines.shift() ?? "",
              notes: lines.join(LINE),
              ...when === null ? {} : { when },
              ...list === null ? {} : { list },
            };
          },
        );
      }
    }
  }
}

(new Things.Things).run();

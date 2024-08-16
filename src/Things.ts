// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: pen-square;
"use strict";

import type { Shortcut } from "./system/Shortcut";

namespace Things {
  const shortcut = importModule<typeof Shortcut>("./system/Shortcut");

  export class Things extends shortcut<
    string,
    readonly ThingsItem[],
    ThingsSetting
  > {
    protected runtime() {
      const { lists, delims } = this.setting,
      { TAG, LINE, ITEM } = delims,
      validator = [TAG, LINE, ITEM] as const;

      if (validator.some(d => d.length < 1))
        throw new TypeError(`Delim empty or too short`, { cause: delims });
      else if (TAG === ITEM || TAG === LINE || ITEM === LINE)
        throw new SyntaxError(`Conflicting delims`, { cause: delims });
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
          )
          .filter(item => item.length > 0);

        return items.map(
          (item): ThingsItem => {
            const tokens = item.split("::"),
            { length } = tokens,
            tag = length > 1 ? (tokens[length - 1] ?? "")[0]?.toLowerCase() ?? null : null;

            if (tag !== null)
              tokens.push((tokens.pop() ?? "").slice(1));

            const untaggedItem = tokens.join(""),
            [when, list] = tag === null ? [null, null] : tag.length < 1 || tag === LINE || !(tag in lists) || (lists[tag] ?? "").length < 1 ? ["today", null] : [null, lists[tag] as unknown as string],
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

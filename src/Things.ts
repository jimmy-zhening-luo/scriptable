// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: pen-square;
"use strict";

import type { Shortcut } from "./lib";

class Things extends importModule<typeof Shortcut<
  Field<"tasks"> & Flag<never, "tagged">,
  readonly ThingsItem[],
  ThingsSetting
>>("./lib") {
  private static check(delims: Things["setting"]["delims"]) {
    try {
      const validator = Object.values(delims);

      if (validator.some(d => d.length < 1))
        throw new TypeError(`Delimeter empty or too short`);
      else if (new Set(validator).size < validator.length)
        throw new SyntaxError(`Duplicate delimeters`);

      return delims;
    }
    catch (e) {
      throw new SyntaxError(`Invalid delimeters: ${JSON.stringify(delims)}`, { cause: e });
    }
  }

  protected runtime() {
    const TODAY = "today",
    { tasks, tagged } = this.inputful,
    { lists, delims } = this.setting,
    { TAG, LINE, ITEM } = this.check(delims),
    items = tasks
      .split(ITEM)
      .reverse()
      .map(
        item => item
          .split(LINE)
          .map(line => line.trim())
          .filter(line => line.length > 0)
          .join(LINE),
      )
      .filter(item => item.length > 0);

    return !tagged
      ? items
        .map(item => item.split(LINE) as Arrayful<string>)
        .map(([title, ...notes]) => { return { title, notes: notes.join(LINE) }; })
      : items.map((item): ThingsItem => {
        const { untagged, tag }: Field<"untagged", "tag"> = item.endsWith(TAG)
          ? {
              untagged: item.slice(0, 0 - TAG.length).trim(),
              tag: TODAY /* bad practice: reserved word */,
            }
          : item.slice(-1 - TAG.length, -1) === TAG
            ? {
                untagged: item.slice(0, -1 - TAG.length).trim(),
                tag: item.slice(-1).toLowerCase(),
              }
            : item.startsWith(TAG)
              ? {
                  untagged: item.slice(TAG.length + 1).trim(),
                  tag: item.slice(TAG.length, TAG.length + 1).toLowerCase(),
                }
              : { untagged: item },
        { when, list }: Field<never, "when" | "list"> = typeof tag === "undefined"
          ? {}
          : tag === TODAY || !(tag in lists)
            ? { when: TODAY }
            : { list: (lists[tag] as typeof lists[number]).id },
        [title, ...notes] = untagged.split(LINE) as Arrayful<string>;

        return {
          title,
          notes: notes.join(LINE),
          ...typeof when === "undefined" ? {} : { when },
          ...typeof list === "undefined" ? {} : { list },
        };
      });
  }
}

new Things().run();

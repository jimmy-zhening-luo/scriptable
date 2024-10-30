// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: pen-square;
"use strict";

import type Shortcut from "./lib";

class Things extends importModule<typeof Shortcut<
  Field<"tasks">,
  (Field<"title" | "notes"> & Record<"when" | "list", Null<string>>)[],
  ThingsSetting
>>("./lib") {
  protected runtime() {
    const { tasks } = this.inputful,
    { lists, delims } = this.setting,
    { TAG, LINE, ITEM } = delims,
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

    return items.map(item => {
      const { untagged, tag = null } = item.endsWith(TAG)
        ? {
            untagged: item.slice(0, 0 - TAG.length).trim(),
            tag: "",
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
      { when = null, list = null } = tag === null
        ? {}
        : !(tag in lists)
            ? { when: "today" }
            : { list: (lists[tag] as typeof lists[number]).id as unknown as string },
      [title, ...notes] = untagged.split(LINE) as Arrayful;

      return {
        title,
        notes: notes.join(LINE),
        when,
        list,
      };
    });
  }
}

new Things().run();

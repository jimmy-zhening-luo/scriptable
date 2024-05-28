// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: less-than-equal;
"use strict";

namespace LastRun {
  const shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class LastRun extends shortcut<
    string
    ,
    boolean
  > {
    protected runtime() {
      const now = Date
        .now();
      const input = this
        .inputStringful
        .split(
          ";",
        ) as [
        string,
          string?,
      ];
      const [id] = input;
      const m = Number(
        input[
          1
        ]
        ?? 2,
      );
      const table = this
        .data<FieldTable>("json")
        ?? {};
      const savedRun = table[
        id
      ] ?? null;

      table[
        id
      ] = String(
        now,
      );
      this
        .write(
          table,
          "json",
        );

      return savedRun === null
        || now - Number(
          savedRun,
        ) > 60000 * m;
    }
  }
}

new LastRun.LastRun()
  .run();

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: cut;
"use strict";

namespace Shorten {
  const shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Shorten extends shortcut<
    string
    ,
    string
  > {
    protected runtime() {
      const url = this
        .inputStringful
        .trim();
      const map = this
        .data<FieldTable>("json")
        ?? {};
      const entries = Object
        .entries(
          map,
        );
      const i = entries
        .find(
          pair =>
            pair[
              1
            ] === url,
        )
        ?? null;

      if (i !== null)
        return i[
          0
        ];
      else {
        const short = this
          .base64guid();

        this
          .write(
            {
              ...map,
              [short]: url,
            },
            "json",
          );

        return short;
      }
    }
  }
}

new Shorten.Shorten()
  .run();

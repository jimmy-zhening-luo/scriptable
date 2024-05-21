// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: cut;
"use strict";

namespace Shorten {
  const shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Shorten extends shortcut<
    | string
    | string[]
    ,
    never,
    never
  > {
    public runtime() {
      const urls =
        [
          this
            .input ?? [],
        ]
          .flat();
      const data =
        this
          .data<Record<string, string>>(
          "urls.json",
        );

      console.log(String(urls));
      console.log(String(data));

      return null;
    }
  }
}

new Shorten.Shorten()
  .run();

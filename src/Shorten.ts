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
    string[],
    never
  > {
    public runtime() {
      const newMappings = 
        [
          this
            .input ?? [],
        ]
          .flat()
          .map(
            (url): Dyad<string> =>
              [
                this
                  .base64guid(),
                url,
              ],
          )
      const newShorts = newMappings
        .map(
          mapping =>
            mapping[1],
        );
      const newData = {
        ...this
          .data<Record<string, string>>(
          "urls.json",
        ),
        ...Object
          .fromEntries(
            newMappings,
          ),
      }

      this
        .write(
          newData,
          "urls.json"
        );

      return newShorts;
    }
  }
}

new Shorten.Shorten()
  .run();

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
      const newUrls =
        Object
          .fromEntries(
            [
              this
                .input ?? [],
            ]
              .flat()
              .map(
                (url): Dyad<string> =>
                  [
                    this
                      .base64guid(
                        url,
                      ),
                    url,
                  ],
              )
          );
      const data =
        this
          .data<Record<string, string>>(
          "urls.json",
        );
      const newData = {
        ...data,
        ...newUrls,
      }

      this
        .write(
          newData,
          "urls.json"
        );

      return null;
    }
  }
}

new Shorten.Shorten()
  .run();

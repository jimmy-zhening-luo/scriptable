// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: cut;
"use strict";

namespace Shorten {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Shorten extends shortcut<
    string | string[],
    never,
    never
  > {
    public runtime(): ReturnType<Shorten["run"]> {
      const urls: string[] = [this.input ?? []]
        .flat();
      const data = this.data<
        Record<string, string>
      >(
        "urls.json",
      );

      return null;
    }
  }
}

new Shorten.Shorten()
  .run();

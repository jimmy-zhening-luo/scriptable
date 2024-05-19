// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: cut;
"use strict";

namespace Shorten {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Shorten extends shortcut<
    never,
    never,
    never
  > {
    public runtime(): ReturnType<Shorten["run"]> {
      return null;
    }
  }
}

new Shorten.Shorten()
  .run();

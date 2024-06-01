// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: cyan; icon-glyph: calendar;
"use strict";

namespace Today {
  const shortcut = importModule(`system/Shortcut`) as typeof Shortcut;

  export class Today extends shortcut<
    never,
    never,
    never
  > {
    protected runtime() {
      return null;
    }
  }
}

new Today.Today()
  .run();

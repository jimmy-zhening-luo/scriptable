// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: brown; icon-glyph: less-than-equal;
"use strict";

namespace LastRun {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class LastRun extends shortcut<
    never,
    never,
    never
  > {
    public runtime() {
      return null;
    }
  }
}

new LastRun.LastRun()
  .run();

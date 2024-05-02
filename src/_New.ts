// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: pen;
"use strict";

namespace New {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class New extends shortcut<
    null,
    string,
    NewSetting
  > {
    public runtime(): null {
      return null;
    }
  }
}

new New.New()
  .run();

export {};

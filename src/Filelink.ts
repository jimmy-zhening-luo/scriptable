// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: file-export;
"use strict";

namespace Filelink {
  const shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Filelink extends shortcut<
    FilelinkInput,
    string,
    FilelinkSetting
  > {
    public runtime() {
      return "";
    }
  }
}

new Filelink.Filelink()
  .run();

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
      const { providers } = this.user;
      const {
        nodes,
        ext,
        type,
      } = this
        .inputful;
      const path = [nodes]
        .flat();
      const [p0] = path;

      if (typeof p0 === "undefined" || !(p0 in user))
        return null;
      else // TBD
        return `TMP: ${ext} ${type}`;
    }
  }
}

new Filelink.Filelink()
  .run();

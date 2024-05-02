// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: code;
"use strict";

namespace NewHelper {
  const helper: typeof Helper = importModule("system/Helper") as typeof Helper;

  export class NewHelper extends helper<
    null,
    string,
    NewHelperSetting
  > {
    public runtime(): null {
      return null;
    }
  }
}

new NewHelper.NewHelper()
  .run();

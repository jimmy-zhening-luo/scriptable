// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: code;
"use strict";

namespace NewHelper {
  const helper: typeof Helper = importModule("system/Helper") as typeof Helper;

  export class NewHelper extends helper<
    void,
    void,
    never
  > {
    public runtime() {
      console.log(true);
    }
  }
}

new NewHelper.NewHelper()
  .run();

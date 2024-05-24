// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: gray; icon-glyph: code;
"use strict";

namespace NewHelper {
  const helper = importModule("system/Helper") as typeof Helper;

  export class NewHelper extends helper<
    void,
    void,
    never
  > {
    public runtime() {
      //
    }
  }
}

new NewHelper.NewHelper()
  .run();

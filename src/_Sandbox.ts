// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: leaf;
"use strict";

import Shortcut from "./lib";

class _Sandbox extends Shortcut {
  protected runtime() {
    const foo = null;

    return foo;
  }
}

await new _Sandbox().run();

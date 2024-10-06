// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: leaf;
"use strict";

import type { Shortcut } from "./lib";

class _Sandbox extends importModule<typeof Shortcut>("./lib") {
  protected runtime() {
    const foo = null;

    return foo;
  }
}

new _Sandbox().run();

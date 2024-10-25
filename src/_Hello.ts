// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: circle;
"use strict";

import type { Shortcut } from "./lib";

class _Hello extends importModule<typeof Shortcut<
  never,
  string,
  Field<never, "space">
>>("./lib") {
  protected runtime() {
    const greeting = `${this.read("hi")}${_Hello.stringful(this.setting.space, "setting")}${this.read()}`;

    this.write(`World from ${_Hello.time()}`);

    return greeting;
  }
}

new _Hello().run();

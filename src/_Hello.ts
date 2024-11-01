// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: circle;
"use strict";

import Shortcut from "./lib";

class _Hello extends Shortcut<
  never,
  string,
  Field<never, "space">
> {
  protected runtime() {
    const greeting = `${this.read("hi")}${_Hello.stringful(this.setting.space, "setting")}${this.read()}`;

    this.write(`World from ${_Hello.time()}`);

    return greeting;
  }
}

await new _Hello().run();

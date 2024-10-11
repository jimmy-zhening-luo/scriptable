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
    const FILE = "worldtime",
    warning = [
      this.readful(),
      this.stringful(this.setting.space, "setting.space"),
      this.read(FILE),
    ].join("");

    this.write(`World!\n(Previous: ${this.time()})`, true, FILE);
    logWarning(warning);

    return warning;
  }
}

new _Hello().run();

// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: link;
"use strict";

namespace Link {
  const shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Link extends shortcut<
    never,
    never,
    never
  > {
    protected runtime() {
      return null;
    }
  }
}

new Link.Link()
  .run();

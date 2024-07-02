// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: yellow; icon-glyph: circle;
"use strict";

import type Shortcut from "./system/Shortcut.js";

const shortcut = importModule(`system/Shortcut`) as typeof Shortcut;

export default class _Hello extends shortcut<
  never
  ,
  string
  ,
  { app?: { space?: string } }
> {
  protected runtime() {
    this
      .debug = true;

    const FILENAME_WORLDTIME = "worldtime";
    const HELLO = this
      .readful();
    const worldtime = this
      .read(
        "txt",
        FILENAME_WORLDTIME,
      );
    const SPACE = this
      .stringful(
        this
          .app
          ?.space ?? "",
        "space",
      );
    const notification = `${
      HELLO
    }${
      SPACE
    }${
      worldtime
    }`;

    this
      .write(
        `World!\n(Previous: ${
          new Date()
            .toISOString()
        })`,
        "txt",
        FILENAME_WORLDTIME,
      );
    console
      .warn(
        notification,
      );

    return notification;
  }
}

new _Hello(
  true,
)
  .run();

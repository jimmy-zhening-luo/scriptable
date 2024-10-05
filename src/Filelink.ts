// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: folder;
"use strict";

import type { Shortcut } from "./system/Shortcut";

class Filelink extends importModule<typeof Shortcut<
  {
    nodes: Unflat;
    ext?: string;
  },
  string
>>("./system/Shortcut") {
  protected runtime() {
    const manager = FileManager.local(),
    { nodes, ext } = this.inputful,
    path = this.stringfuls(
      [nodes].flat(),
      "Empty or sparse path",
    ),
    [p1, p2] = path;

    if (!manager.bookmarkExists(p1))
      throw new ReferenceError(`No bookmark found for path`);

    const [bookmark, head] = typeof p2 === "undefined" || !manager.bookmarkExists(`${p1}/${p2}`)
      ? [p1, 1]
      : [`${p1}/${p2}`, 2],
    root = manager.bookmarkedPath(bookmark),
    subpath = path.slice(head);

    return encodeURI(
      [
        `shareddocuments://${root}`,
        ...subpath.length < 1
          ? []
          : [
              [
                subpath.join("/"),
                ...typeof ext === "undefined"
                  ? []
                  : [ext],
              ]
                .join("."),
            ],
      ]
        .join("/"),
    );
  }
}

new Filelink().run();

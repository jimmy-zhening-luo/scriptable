// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: sign-in-alt;
"use strict";

import type { Shortcut } from "./system/Shortcut";

namespace Ziplink {
  const shortcut = importModule<typeof Shortcut>("./system/Shortcut");

  export class Ziplink extends shortcut<
    string,
    string
  > {
    protected runtime() {
      const url = this.inputStringful.trim(),
      storage = this.data<FieldTable>(null, "json") ?? {},
      ziplink = Object.entries(storage).find(([, u]) => u === url) ?? null;

      if (ziplink !== null) {
        const [id] = ziplink;

        return id;
      }
      else {
        const id = this.guid64();

        storage[id] = url;
        this.write(
          storage,
          null,
          "json",
        );

        return `shortcuts://run-shortcut?name=I&input=${id}`;
      }
    }
  }
}

(new Ziplink.Ziplink).run();

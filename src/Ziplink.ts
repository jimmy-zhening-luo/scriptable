// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: sign-in-alt;
"use strict";

namespace Ziplink {
  const shortcut = importModule<typeof Shortcut>("system/Shortcut");

  export class Ziplink extends shortcut<
    string,
    string
  > {
    protected runtime() {
      const url = this.inputStringful.trim(),
      storage = this.data<FieldTable>("json") ?? {},
      ziplinks = Object.entries(storage),
      ziplink = ziplinks.find(([, u]) => u === url)
      ?? null;

      if (ziplink !== null) {
        const [id] = ziplink;

        return id;
      }
      else {
        const id = this.guid64();

        storage[id] = url;
        this.write(
          storage,
          "json",
        );

        return `shortcuts://run-shortcut?name=I&input=${id}`;
      }
    }
  }
}

(new Ziplink.Ziplink).run();

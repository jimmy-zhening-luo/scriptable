// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: folder;
"use strict";

import type { Shortcut } from "./system/Shortcut";

class Filelink extends importModule<typeof Shortcut<
  {
    nodes: Unflat;
    ext: string;
    type: "File" | "Folder";
  },
  string,
  FilelinkSetting
>>("./system/Shortcut") {
  protected runtime() {
    const { nodes, ext, type } = this.inputful,
    { providers, scheme, commonRoot } = this.setting,
    path = this.path(nodes);

    try {
      const provider = providers[path[0]] ?? null;

      if (provider === null)
        throw new ReferenceError(`Provider not found`);
      else {
        path.shift();

        const head = [`${scheme}://${commonRoot}`, encodeURI(provider.providerRoot)].join("/"),
        tail = encodeURI(`${path.pop() as string}${type === "Folder" ? "" : `.${ext}`}`),
        torso = [...path],
        container: string[] = [];

        if (provider.hasContainers) {
          const {
            containers: { folders, apps },
            folderRoot,
            preAppRoot,
            postContainerRoot,
          } = provider;

          if (torso.length > 0) {
            const p2 = torso.shift() as string;

            if (folders.includes(p2))
              container.push(`${encodeURI(folderRoot)}/${encodeURI(p2)}`);
            else if (p2 in apps)
              container.push([
                ...typeof preAppRoot === "undefined" ? [] : [encodeURI(preAppRoot)],
                encodeURI(apps[p2] as string),
                encodeURI(postContainerRoot),
              ].join("/"));
            else
              throw new ReferenceError(`Container not found in provider`);
          }
          else
            throw new ReferenceError(`Path cannot be container root`);
        }

        return [
          head,
          ...container,
          ...torso.map(node => encodeURI(node)),
          tail,
        ]
          .join("/");
      }
    }
    catch (e) {
      throw new Error(path.join("/"), { cause: e });
    }
  }

  private path(nodes: Unflat) {
    const path = this.stringfuls([nodes].flat(), "Path empty or has empty nodes"),
    { length } = path;

    if (length < 2)
      throw new RangeError(`Path points to provider root`);
    else
      return path as ArrayN<stringful, 2>;
  }
}

new Filelink().run();

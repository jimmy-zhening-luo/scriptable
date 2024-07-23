// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: folder;
"use strict";

namespace Filelink {
  const shortcut = importModule<typeof Shortcut>("system/Shortcut");

  export class Filelink extends shortcut<
    FilelinkInput,
    string,
    FilelinkSetting
  > {
    protected runtime() {
      const {
        scheme,
        commonRoot,
        providers,
      } = this.setting,
      SCHEME_ROOT = [scheme, commonRoot].join("://"),
      {
        nodes,
        ext,
        type,
      } = this.inputful,
      path = this.validPath(nodes),
      [rootNode] = path,
      provider = providers[rootNode] ?? null;

      if (provider === null)
        throw new ReferenceError(
          `Provider not found`,
          { cause: { rootNode, providers: Object.keys(providers) } },
        );
      else {
        path.shift();

        const { providerRoot } = provider,
        providerRootEncoded = encodeURI(providerRoot),
        head = [SCHEME_ROOT, providerRootEncoded].join("/"),
        leafNode = path.pop() as unknown as stringful,
        remainingPath = [...path],
        filenameEncoded = encodeURI(
          type === "Folder"
            ? leafNode
            : [leafNode, ext].join("."),
        );

        if (!provider.hasContainers)
          return [
            head,
            ...remainingPath.map(node => encodeURI(node)),
            filenameEncoded,
          ]
            .join("/");
        else {
          const {
            postContainerRoot,
            folderRoot,
            preAppRoot,
            containers: { folders, apps },
          } = provider;

          if (remainingPath.length < 1)
            throw new ReferenceError(
              `Path points to container root within a provider`,
              { cause: { remainingPath } },
            );
          else {
            const containerNode = remainingPath.shift() as unknown as stringful,
            containerEncoded = (
              folders.includes(containerNode)
                ? [folderRoot, containerNode]
                    .map(segment => encodeURI(segment))
                    .join("/")
                : containerNode in apps
                  ? [
                      ...typeof preAppRoot === "undefined" ? [] : [preAppRoot],
                      apps[containerNode] as unknown as string,
                      postContainerRoot,
                    ]
                      .map(segment => encodeURI(segment))
                      .join("/")
                  : null
            ) ?? null;

            if (containerEncoded === null)
              throw new ReferenceError(
                `Provider has no such container`,
                {
                  cause: {
                    containerNode,
                    providerRootEncoded,
                    folders,
                    apps: Object.keys(apps),
                  },
                },
              );
            else
              return [
                head,
                containerEncoded,
                ...remainingPath.map(node => encodeURI(node)),
                filenameEncoded,
              ]
                .join("/");
          }
        }
      }
    }

    private validPath(nodes: Unflat) {
      try {
        const path = this.stringfuls([nodes].flat()),
        { length } = path;

        if (length < 1)
          throw new SyntaxError(`Input path empty`);
        else if (length < 2)
          throw new RangeError(
            `Path points to provider root`,
            { cause: { path, length } },
          );
        else
          return path as ArrayN<stringful, 2>;
      }
      catch (e) {
        throw new Error(
          `Filelink: validPath`,
          { cause: e },
        );
      }
    }
  }
}

(new Filelink.Filelink).run();

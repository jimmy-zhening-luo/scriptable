// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: file-export;
"use strict";

namespace Filelink {
  const shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Filelink extends shortcut<
    FilelinkInput,
    string,
    FilelinkSetting
  > {
    protected runtime() {
      const SCHEME_ROOT = "shareddocuments://private/var/mobile";
      const POST_APP = "Documents";
      const {
        nodes,
        ext,
        type,
      } = this
        .inputful;
      const path = this
        .validPath(
          nodes,
        );
      const [rootNode] = path;
      const { providers } = this
        .user;
      const provider = providers[
        rootNode
      ]
      ?? null;

      if (
        provider === null
      )
        throw new ReferenceError(
          `Provider not found`,
          {
            cause: {
              rootNode,
              providers: Object.keys(providers),
            },
          },
        );
      else {
        path
          .shift();

        const { providerRoot } = provider;
        const providerRootEncoded = encodeURI(
          providerRoot,
        );
        const head = [
          SCHEME_ROOT,
          providerRootEncoded,
        ]
          .join(
            "/",
          );
        const leafNode = path
          .pop() as unknown as stringful;
        const remainingPath = [...path];
        const filenameEncoded = encodeURI(
          type === "Folder"
            ? leafNode
            : [
                leafNode,
                ext,
              ]
                .join(
                  ".",
                ),
        );

        if (
          !provider
            .hasContainers
        )
          return [
            head,
            ...remainingPath
              .map(
                node =>
                  encodeURI(
                    node,
                  ),
              ),
            filenameEncoded,
          ]
            .join(
              "/",
            );
        else {
          const {
            containers,
            folderRoot,
            preAppRoot,
          } = provider;
          const {
            folders,
            apps,
          } = containers;

          if (
            remainingPath
              .length < 1
          )
            throw new ReferenceError(
              `Path points to container root within a provider`,
              { cause: { remainingPath } },
            );
          else {
            const containerNode = remainingPath
              .shift() as unknown as stringful;
            const containerEncoded = (
              folders
                .includes(
                  containerNode,
                )
                ? [
                    folderRoot,
                    containerNode,
                  ]
                    .map(
                      segment =>
                        encodeURI(
                          segment,
                        ),
                    )
                    .join(
                      "/",
                    )
                : containerNode in apps
                  ? [
                      ...typeof preAppRoot === "undefined"
                        ? []
                        : [preAppRoot],
                      apps[containerNode] as unknown as string,
                      POST_APP,
                    ]
                      .map(
                        segment =>
                          encodeURI(
                            segment,
                          ),
                      )
                      .join(
                        "/",
                      )
                  : null
            )
            ?? null;

            if (
              containerEncoded === null
            )
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
                ...remainingPath
                  .map(
                    node =>
                      encodeURI(
                        node,
                      ),
                  ),
                filenameEncoded,
              ]
                .join(
                  "/",
                );
          }
        }
      }
    }

    private validPath(
      nodes: Unflat<
        string
      >,
    ) {
      try {
        const path = this
          .stringfulArray(
            [nodes]
              .flat(),
          );
        const { length } = path;

        if (
          length < 1
        )
          throw new SyntaxError(
            `Input path empty`,
          );
        else if (
          length < 2
        )
          throw new RangeError(
            `Path points to provider root`,
            {
              cause: {
                path,
                length,
              },
            },
          );
        else
          return path as ArrayN<
            stringful
            ,
            2
          >;
      }
      catch (e) {
        throw new EvalError(
          `Filelink: validPath`,
          { cause: e },
        );
      }
    }
  }
}

new Filelink.Filelink()
  .run();

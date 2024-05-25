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
        const leafNode = path
          .pop() as unknown as stringful;
        const leaf = type === "Folder"
          ? leafNode
          : [
              leafNode,
              ext,
            ]
              .join(
                ".",
              );

        if (
          !provider
            .hasContainers
        )
          return [
            providerRoot,
            ...path,
            leaf,
          ]
            .join(
              "/",
            );
        else
          throw new SyntaxError(
            `NOT YET IMPLEMENTED: Provider has containers`,
          );
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
          throw new TypeError(
            `Path has no leaves`,
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

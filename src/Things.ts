// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: pen-square;
"use strict";

import type Shortcut from "./system/Shortcut.js";

const shortcut = importModule(`system/Shortcut`) as typeof Shortcut;

export default class Things extends shortcut<
  string
  ,
  readonly ThingsItem[]
  ,
  ThingsSetting
> {
  protected runtime() {
    const input = this
      .inputStringful;
    const {
      app: {
        tag,
        delims,
      },
      user: {
        triage,
        lists,
      },
    } = this;

    return input
      .split(
        delims
          .item,
      )
      .reverse()
      .map(
        item =>
          item
            .trim(),
      )
      .map(
        (item): ThingsItem => {
          const lines = item
            .split(
              delims
                .line,
            );
          const lastTaggedLine = [...lines]
            .reverse()
            .find(
              line =>
                line
                  .includes(
                    tag,
                  ),
            ) ?? null;
          const isTagged = lastTaggedLine !== null;
          const iLastTag =
              lastTaggedLine === null
                ? null
                : lastTaggedLine
                  .lastIndexOf(
                    tag,
                  ) as Positive<fint>;
          const lastTag =
              lastTaggedLine === null
              || iLastTag === null
                ? null
                : lastTaggedLine.length === iLastTag + 1
                  ? null
                  : (
                      lastTaggedLine[
                        iLastTag + 1
                      ] ?? ""
                    )
                      .toLowerCase();
          const flags: Pick<
            ThingsItem,
            | "when"
            | "list"
          > =
              !isTagged
                ? {}
                : lastTag === null
                || lastTag.length < 1
                  ? { when: "today" }
                  : {
                      list: lists[
                        lastTag
                      ] ?? "",
                    };

          return {
            title: encodeURI(
              lines
                .shift() ?? "",
            ),
            notes: encodeURI(
              lines
                .join(
                  delims
                    .line,
                ),
            ),
            triage,
            ...flags,
          };
        },
      );
  }
}

new Things()
  .run();

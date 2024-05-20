// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: check-circle;
"use strict";

namespace Things {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Things extends shortcut<
    string,
    ThingsItem[],
    ThingsSetting
  > {
    public runtime() {
      const input: stringful = this.inputStringful;
      const {
        app: {
          tag,
          delims,
        },
        user: {
          triage,
          lists,
        },
      }: ThingsSetting = this.setting.parsed;

      return input
        .split(
          delims.item,
        )
        .reverse()
        .map(
          (item: string): string =>
            item.trim(),
        )
        .map(
          (item: string): ThingsItem => {
            const lines: string[] = item.split(
              delims.line,
            );
            const lastTaggedLine: Null<string> = [...lines]
              .reverse()
              .find(
                (line: string): boolean =>
                  line.includes(tag),
              ) ?? null;
            const isTagged: boolean = lastTaggedLine !== null;
            const iLastTag: Null<number> = lastTaggedLine === null
              ? null
              : lastTaggedLine
                .lastIndexOf(
                  tag,
                ) as posint;
            const lastTag: Null<string> = lastTaggedLine === null || iLastTag === null
              ? null
              : lastTaggedLine.length === iLastTag + 1
                ? null
                : (lastTaggedLine[iLastTag + 1] ?? "").toLowerCase();
            const flags: Pick<
              ThingsItem,
              "when" | "list"
            > = !isTagged
              ? {}
              : {
                  when: "today",
                  ...lastTag === null || lastTag.length === 0
                    ? {}
                    : { list: lists[lastTag] ?? "" },
                };

            if ("list" in flags && flags.list.length > 0)
              flags.when = "someday";

            return {
              title: encodeURI(
                lines.shift() ?? "",
              ),
              notes: encodeURI(
                lines.join(
                  delims.line,
                ),
              ),
              triage,
              ...flags,
            };
          },
        );
    }
  }
}

new Things.Things()
  .run();

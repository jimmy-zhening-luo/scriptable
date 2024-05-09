// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: check-circle;
"use strict";

namespace Things {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Things extends shortcut<
    string,
    ThingsOutput,
    ThingsSetting
  > {
    public runtime(): ReturnType<Things["run"]> {
      const input: stringful = this.inputStringful;
      const {
        tag,
        delims,
      }: ThingsAppSetting = this.app;
      const {
        triage,
        lists,
      }: ThingsUserSetting = this.user;

      return {
        items: input
          .split(
            delims.item,
          )
          .map(
            (item: string): string =>
              item.trim(),
          )
          .map(
            (item: string): ThingsItem => {
              const lines: string[] = item.split(
                delims.line,
              );
              const lastTaggedLine: number = [...lines]
                .reverse
                .findIndex(
                  (line: string): boolean =>
                    line.includes(tag),
                );
              const lastTag: Nullable<number> = lastTaggedLine < 0
                ? null
                : (lines[lines.length - 1 - lastTaggedLine] ?? "")
                  .lastIndexOf(
                  tag,
                ) as posint;
              const flags: Pick<
                ThingsItem,
                "when" | "list"
              > = lastTag === null
                ? {}
                : {
                    when: "today",
                    ...input.length === lastTag + 1
                      ? {}
                      : {
                          list: lists[
                            this
                              .stringful(
                                (input[lastTag + 1] ?? "")
                                  .toLowerCase(),
                              )
                          ] ?? "",
                        },
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
          ),
      };
    }
  }
}

new Things.Things()
  .run();

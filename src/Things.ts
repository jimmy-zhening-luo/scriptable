// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-blue; icon-glyph: check-circle;
"use strict";

namespace Things {
  const shortcut: typeof Shortcut = importModule("system/Shortcut") as typeof Shortcut;

  export class Things extends shortcut<
    string,
    ThingsItemOutput[],
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

      return input
        .split(
          delims.item,
        )
        .map(
          (item: string): string =>
            item.trim(),
        )
        .map(
          (item: string): ThingsItemOutput => {
            const lines: string[] = item.split(
              delims.line,
            );
            const tagLast: Nullable<number> = item.includes(
              tag,
            )
              ? item.lastIndexOf(
                tag,
              ) as posint
              : null;
            const flags: Pick<
              ThingsItemOutput,
              "when" | "list"
            > = tagLast === null
              ? {}
              : {
                  when: "today",
                  ...input.length === tagLast + 1
                    ? {}
                    : {
                        list: lists[
                          this
                            .stringful(
                              (input[tagLast + 1] ?? "")
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
        );
    }
  }
}

new Things.Things()
  .run();

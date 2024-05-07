// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-gray; icon-glyph: pen;
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
      const { projects }: ThingsUserSetting = this.user;

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
            const finalTag: Nullable<number> = item.includes(tag)
              ? item.lastIndexOf(tag) as posint
              : null;
            const project: Nullable<string> = finalTag === null || input.length === finalTag + 1
              ? null
              : projects[
                this.stringful(
                  input[finalTag + 1] ?? "",
                )
              ] ?? null;
            const lines: string[] = item.split(
              delims.line,
            );

            return {
              title: lines.shift() ?? "",
              notes: lines.join(delims.line),
              today: finalTag !== null && project === null,
              ...project === null
                ? {}
                : { project },
            };
          },
        );
    }
  }
}

new Things.Things()
  .run();

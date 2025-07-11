import type { SearchEngineSetting } from "./engine";

export interface SearchSetting {
  readonly reserved: {
    readonly selectors: readonly string[];
    readonly tag: string;
  };
  readonly alias: Readonly<FieldTable>;
  readonly engines: Readonly<Table<
    | Unflat<string, true>
    | SearchEngineSetting<
      "url",
      (
        | "force"
      ),
      (
        | "separator"
      ),
      Unflat
    >
    | SearchEngineSetting<
      "shortcut",
      (
        | "encode"
        | "notify"
      ),
      (
        | "separator"
      )
    >
  >>;
}

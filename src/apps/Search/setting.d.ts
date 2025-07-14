import type { ISearchEngineEntry } from "./engine";

export interface SearchSetting {
  readonly reserved: {
    readonly selectors: readonly string[];
    readonly tag: string;
  };
  readonly alias: Readonly<FieldTable>;
  readonly engines: Readonly<Table<
    | Unflat
    | ISearchEngineEntry<
      "url",
      (
        | "force"
      ),
      (
        | "separator"
      ),
      Unflat
    >
    | ISearchEngineEntry<
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

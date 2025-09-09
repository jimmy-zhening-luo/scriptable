import type { ISearchEngineEntry } from "./engine";

export interface SearchSetting {
  readonly reserved: Field<
    | "selectors"
    | "tag"
  >;
  readonly alias: Readonly<FieldTable>;
  readonly engines: Readonly<Table<
    | Unflat<string, true>
    | ISearchEngineEntry<
      "url",
      "force",
      "separator",
      Unflat
    >
    | ISearchEngineEntry<
      "shortcut",
      (
        | "encode"
        | "notify"
      ),
      "separator"
    >
  >>;
}

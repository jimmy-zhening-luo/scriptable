import type { ISearchEngineEntry } from "./engine";

export interface SearchSetting {
  reserved: Field<
    | "selectors"
    | "tag"
  >;
  alias: FieldTable;
  engines: Table<
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
  >;
}

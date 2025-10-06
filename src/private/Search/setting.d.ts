import type { ISearchEngine } from "./engine";

export interface SearchSetting {
  reserved: Field<"selectors">;
  alias: FieldTable;
  engines: Table<
    | Unflat<string, true>
    | ISearchEngine<
      "url",
      "force",
      "separator",
      Unflat
    >
    | ISearchEngine<
      "shortcut",
      (
        | "encode"
        | "notify"
      ),
      "separator"
    >
  >;
}

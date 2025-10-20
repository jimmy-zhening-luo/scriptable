import type { ISearchEngine } from "./engine";

export interface SearchSetting {
  alias: FieldTable;
  engines: Table<
    | Unflat<string, true>
    | ISearchEngine<
      "url",
      "force",
      never,
      Unflat<string, true>
    >
    | ISearchEngine<
      "shortcut",
      | "encode"
      | "notify"
    >
  >;
  reserved: {
    keys: Fieldful<
      | "chat"
      | "math"
      | "skip"
      | "translate"
    >;
    selectors: string;
  };
}

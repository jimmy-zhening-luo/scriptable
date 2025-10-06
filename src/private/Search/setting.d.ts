import type { ISearchEngine } from "./engine";

export interface SearchSetting {
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
  reserved: {
    keys: Record<
      (
        | "chat"
        | "math"
        | "skip"
        | "translate"
      ),
      stringful
    >;
    selectors: string;
  };
}

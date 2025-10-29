import type { ISearchEngine } from "./engine";

type SearchEngine
= | Unflat<string, true>
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
  >;

export interface SearchSetting {
  alias: Tableful<stringful>;
  engines: Tableful<SearchEngine>;
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

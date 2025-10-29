import type { ISearchEngine } from "./engine";

type SearchEngine
= | Unflat<stringful, true>
  | ISearchEngine<
    "url",
    "force",
    never,
    Unflat<stringful, true>
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

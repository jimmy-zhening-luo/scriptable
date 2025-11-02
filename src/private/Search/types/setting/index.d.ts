import type { ISearchEngine } from "./engine";

type SearchEngine
= | Unflat<stringful>
  | ISearchEngine<
    "url",
    "force",
    never,
    Unflat<stringful>
  >
  | ISearchEngine<
    "shortcut",
    | "encode"
    | "notify"
  >;

export interface SearchSetting {
  alias: Tableful<stringful>;
  chars: Tableful<SearchEngine>;
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

import type { SearchEngineSetting } from "./engine";

export interface SearchSetting {
  readonly reserved: {
    readonly tags: Field<
      | "query"
    >;
    readonly selectors: string[];
    readonly operators: string;
  };
  readonly fallbacks: string[];
  readonly alias: FieldTable;
  readonly engines: Table<
    | Unflat<string, true>
    | Record<string, never>
    | SearchEngineSetting<
      "shortcut",
      | "notify"
      | "select"
    >
    | SearchEngineSetting<
      "api",
      "encodeComponent",
      never,
      Field<never, "separator">
    >
    | SearchEngineSetting<
      "url",
      | "encodeComponent"
      | "force"
      | "inprivate",
      never,
      Field<never, "separator">,
      Unflat
    >
  >;
}

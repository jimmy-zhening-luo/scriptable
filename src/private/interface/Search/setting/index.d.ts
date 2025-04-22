import type { SearchEngineSetting } from "./engine";

export interface SearchSetting {
  readonly alias: FieldTable;
  readonly engines: Table<
    | Unflat<string, true>
    | SearchEngineSetting<
      "url",
      | "encodeComponent"
      | "force"
      | "inprivate",
      never,
      Field<never, "separator">,
      Unflat
    >
    | SearchEngineSetting<
      "api",
      "encodeComponent",
      never,
      Field<never, "separator">
    >
    | Record<string, never>
    | SearchEngineSetting<
      "shortcut",
      | "notify"
      | "select"
    >
  >;
  readonly fallbacks: string[];
  readonly reserved: {
    readonly operators: string;
    readonly selectors: string[];
    readonly tag: string;
  };
}

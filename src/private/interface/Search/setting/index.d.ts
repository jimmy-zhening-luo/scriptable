import type { SearchEngineSetting } from "./engine";

export interface SearchSetting {
  readonly reserved: {
    readonly operators: string;
    readonly selectors: readonly string[];
    readonly tag: string;
  };
  readonly fallbacks: readonly string[];
  readonly alias: Readonly<FieldTable>;
  readonly engines: Readonly<Table<
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
  >>;
}

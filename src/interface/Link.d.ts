import type Url from "../lib/object/url";

export interface LinkSetting {
  readonly hosts: {
    readonly www: readonly Url["host"][];
    readonly canonical: Endomap<Url["host"]>;
  };
  readonly queries: {
    readonly remove: readonly Url["host"][];
  } & Readonly<Record<
    | "include"
    | "exclude",
    Record<
      Url["host"],
      readonly string[]
    >
  >>;
  readonly fragments: {
    readonly shave: readonly Url["host"][];
  };
}
